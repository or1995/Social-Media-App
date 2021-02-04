import axios from 'axios';

import * as actionTypes from './actionTypes';

export const commentLoadingTrue = () => {
    return {
        type: actionTypes.POST_COMMENTS_LOADING_TRUE
    }
}

export const commentLoadingFalse = () => {
    return {
        type: actionTypes.POST_COMMENTS_LOADING_FALSE
    }
}

export const getCommentLoadingTrue = () => {
    return {
        type: actionTypes.GET_COMMENTS_LOADING_TRUE
    }
}

export const getCommentLoadingFalse = () => {
    return {
        type: actionTypes.GET_COMMENTS_LOADING_FALSE
    }
}

export const setCommentsInState = (data) => {
    return {
        type: actionTypes.SET_COMMENTS_IN_STATE,
        comments: data
    }
}

export const setAllCommentsInState = (data) => {
    return {
        type: actionTypes.SET_ALL_COMMENTS_IN_STATE,
        allComments: data
    }
}

export const postComments = (data) => {
    return dispatch => {
        dispatch(commentLoadingTrue());
        axios.post('https://socialmedia-2fd3c.firebaseio.com/comments.json', data)
            .then(response => {
                dispatch(commentLoadingFalse());
            });
    }
};

export const getAllComments = () => {
    return dispatch => {
        dispatch(getCommentLoadingTrue());
        axios.get('https://socialmedia-2fd3c.firebaseio.com/comments.json')
        .then(res => {
            const fetchedComments = [];
            for(let key in res.data) {
                fetchedComments.push({
                    dataBaseId: key,
                    ...res.data[key],
                });
            }
            dispatch(setAllCommentsInState(fetchedComments));
        });
    }
}

export const getComments = (id) => {
    return dispatch => {
        dispatch(getCommentLoadingTrue());
        axios.get('https://socialmedia-2fd3c.firebaseio.com/comments.json')
        .then(res => {
            const fetchedComments = [];
            for(let key in res.data) {
                fetchedComments.push({
                    dataBaseId: key,
                    ...res.data[key],
                });
            }

            const postComments = fetchedComments.filter(comment => {
                return comment.postId === id
            })

            dispatch(setCommentsInState(postComments));
            dispatch(getCommentLoadingFalse());
        });
    }
}

export const updateCommentsLikes = (postDbKey, likes) => {
    return dispatch => {
        dispatch(getCommentLoadingTrue());
        axios.put('https://socialmedia-2fd3c.firebaseio.com/comments/' + postDbKey + '/likes' + '.json', likes)
        .then( res => {
            dispatch(getCommentLoadingFalse());
        })
    };
};