import axios from 'axios';

import * as actionTypes from './actionTypes';

export const postLoadingTrue = () => {
    return {
        type: actionTypes.POST_LOADING_TRUE
    }
}

export const postLoadingFalse = () => {
    return {
        type: actionTypes.POST_LOADING_FALSE
    }
}

export const getLoadingTrue = () => {
    return {
        type: actionTypes.GET_LOADING_TRUE
    }
}

export const getLoadingFalse = () => {
    return {
        type: actionTypes.GET_LOADING_FALSE
    }
}

export const setPostsInState = (data) => {
    return {
        type: actionTypes.SET_POSTS_IN_STATE,
        posts: data
    }
}

export const likeLoadingTrue = () => {
    return {
        type: actionTypes.LIKE_LOADING_TRUE
    }
}

export const likeLoadingFalse = () => {
    return {
        type: actionTypes.LIKE_LOADING_FALSE
    }
}



export const postPosts = (data) => {
    return dispatch => {
        dispatch(postLoadingTrue());
        axios.post('https://socialmedia-2fd3c.firebaseio.com/posts.json', data)
            .then(response => {
                dispatch(postLoadingFalse());
            });
    }
};

export const getPosts = () => {
    return dispatch => {
        dispatch(getLoadingTrue());
        axios.get('https://socialmedia-2fd3c.firebaseio.com/posts.json')
        .then(res => {
            const fetchedPosts = [];
            for(let key in res.data) {
                fetchedPosts.push({
                    dataBaseId: key,
                    ...res.data[key]
                });
            }
            dispatch(setPostsInState(fetchedPosts));
            dispatch(getLoadingFalse());
        });
    }
}

export const updatePostsLikes = (postDbKey, likes) => {
    return dispatch => {
        dispatch(likeLoadingTrue());
        axios.put('https://socialmedia-2fd3c.firebaseio.com/posts/' + postDbKey + '/likes.json', likes)
        .then( res => {
            dispatch(likeLoadingFalse());
        })
    };
};