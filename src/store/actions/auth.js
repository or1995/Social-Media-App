import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, username, usertheme) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        username: username,
        usertheme: usertheme
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('exiprationDate');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
}

export const getUserName = (user) => {
    return {
        type: actionTypes.GET_USER_NAME,
        username: user
    }
}

export const getUserTheme = (theme) => {
    return {
        type: actionTypes.GET_USER_THEME,
        userTheme: theme
    }
}

export const auth = (email, password, userName, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let signInUsername;
        let signInUsertheme;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApulzF6CwA6d1GNYciuOz-OgrxfZNOp9o';
        if(!isSignUp) {
            url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApulzF6CwA6d1GNYciuOz-OgrxfZNOp9o';
        }
        axios.post(url, authData)
        .then( response => {

            const userData = {
                userId: response.data.localId,
                userName: userName
            };

            if(!isSignUp) {
                axios.get('https://socialmedia-2fd3c.firebaseio.com/users.json')
                .then(res => {
                    for(let key in res.data) {
                       if(res.data[key].userId === response.data.localId ) {
                        signInUsername = res.data[key].userName;
                        signInUsertheme = res.data[key].theme;
                       };   
                    };
                    console.log({signInUsername});
                    const exiprationDate = new Date( new Date().getTime() + response.data.expiresIn * 1000 );
                    localStorage.setItem('token', response.data.idToken);
                    localStorage.setItem('exiprationDate', exiprationDate);
                    localStorage.setItem('userId', response.data.localId);
                    dispatch(authSuccess(response.data.idToken, response.data.localId, signInUsername, signInUsertheme));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                    return
                });
            } else {
                axios.post('https://socialmedia-2fd3c.firebaseio.com/users.json', userData)
                .then(resp => {
                    
                })
                
                const exiprationDate = new Date( new Date().getTime() + response.data.expiresIn * 1000 );
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('exiprationDate', exiprationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId, userName, null));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }
        })
        .catch(err => {
            
            dispatch(authFail(err.response.data.error));
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authLoader = (state) => {
    return {
        type: actionTypes.AUTH_LOADER,
        loaderState: state
    };
};

export const authCheckState = () => {
    return dispatch => {
        console.log('auth check!');
        dispatch(authLoader(true));
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
            dispatch(authLoader(false));
        } else {
            const expirationDate = new Date(localStorage.getItem('exiprationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000);
                axios.get('https://socialmedia-2fd3c.firebaseio.com/users.json')
                .then(res => {
                    let username;
                    let theme;
                    for(let key in res.data) {
                       if(res.data[key].userId === userId ) {
                            username = res.data[key].userName;
                            theme = res.data[key].theme;
                       };   
                    };
                    dispatch(authSuccess(token, userId, username, theme));
                    dispatch(authLoader(false));
                })
            };
        };
    };
}