import axios from 'axios';
import * as actionTypes from './actionTypes';

export const likeButtonTimeoutTrue = () => {
    return {
        type: actionTypes.LIKE_BUTTON_TIMEOUT_TRUE
    }
}

export const likeButtonTimeoutFalse = () => {
    return {
        type: actionTypes.LIKE_BUTTON_TIMEOUT_FALSE
    }
}

export const userLikePost = (data) => {
    return dispatch => {
        dispatch(likeButtonTimeoutTrue());
        axios.post('https://socialmedia-2fd3c.firebaseio.com/likes.json', data)
            .then(response => {
                dispatch(likeButtonTimeoutFalse());
            })
            .catch(err => {
                
            }
            );
    }
};

export const userLikePut = (postDbKey, data) => {
    return dispatch => {
        dispatch(likeButtonTimeoutTrue());
        axios.put('https://socialmedia-2fd3c.firebaseio.com/likes/' + postDbKey + '/likeType.json', data)
            .then(response => {
                dispatch(likeButtonTimeoutFalse());
            }).catch(err => {
                
            }
            );
    }
};

export const userLikeDelete = (id) => {
    return dispatch => {
        dispatch(likeButtonTimeoutTrue());
        axios.delete('https://socialmedia-2fd3c.firebaseio.com/likes/' + id + '.json')
        .then( res => {
            dispatch(likeButtonTimeoutFalse());
        }).catch(err => {
            
        }
        );
    }
};
