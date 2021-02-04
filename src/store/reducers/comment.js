import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    comments: [],
    allComments: [],
    postCommentLoading: false,
    getCommentLoading: false
}

const setComments = (state, action) => {
    return updateObject(state, { comments: action.comments });
};

const setAllComments = (state, action) => {
    return updateObject(state, {allComments: action.allComments});
}

const setCommentLoadingFalse = (state, action) => {
    return updateObject(state, { postCommentLoading: false });
};
const setCommentLoadingTrue = (state, action) => {
    return updateObject(state, { postCommentLoading: true });
};

const setGetCommentLoadingFalse = (state, action) => {
    return updateObject(state, { getCommentLoading: false });
};

const setGetCommentLoadingTrue = (state, action) => {
    return updateObject(state, { getCommentLoading: true });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_COMMENTS_IN_STATE: return setComments(state, action);
        case actionTypes.SET_ALL_COMMENTS_IN_STATE: return setAllComments(state, action);
        case actionTypes.POST_COMMENTS_LOADING_FALSE: return setCommentLoadingFalse(state, action);
        case actionTypes.POST_COMMENTS_LOADING_TRUE: return setCommentLoadingTrue(state, action);
        case actionTypes.GET_COMMENTS_LOADING_FALSE: return setGetCommentLoadingFalse(state, action);
        case actionTypes.GET_COMMENTS_LOADING_FALSE: return setGetCommentLoadingTrue(state, action);
        default: return state;
    }
};

export default reducer;