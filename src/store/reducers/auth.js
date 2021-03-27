import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    userName: null,
    userTheme: null,
    authLoader: false,
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, { 
        token: action.idToken,
        userId: action.userId,
        userName: action.username,
        error: null,
        loading: false
     });
};

const authFail = (state, action) => {
    return updateObject(state, { 
        error: action.error,
        loading: false
    });
};

const getUserName = (state, action) => {
    return updateObject(state, { 
        userName: action.username
    });
};

const getUserTheme = (state, action) => {
    return updateObject(state, { 
        userTheme: action.userTheme
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { 
        token: null,
        userId: null
    });
};

const authLoader = (state, action) => {
    return updateObject(state, { 
        authLoader: action.loaderState
    });
};

const authRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_LOADER: return authLoader(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return authRedirectPath(state, action);
        case actionTypes.GET_USER_NAME: return getUserName(state, action);
        case actionTypes.GET_USER_THEME: return getUserTheme(state, action);
        default: return state;
    }
};

export default reducer;