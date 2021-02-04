import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    posts: [],
    postLoading: false,
    getLoading: false,
    likeLoading: false
}

const setPosts = (state, action) => {
    return updateObject(state, { posts: action.posts });
};

const setPostLoadingFalse = (state, action) => {
    return updateObject(state, { postLoading: false });
};
const setPostLoadingTrue = (state, action) => {
    return updateObject(state, { postLoading: true });
};

const setGetLoadingFalse = (state, action) => {
    return updateObject(state, { getLoading: false });
};

const setGetLoadingTrue = (state, action) => {
    return updateObject(state, { getLoading: true });
};

const setLikeLoadingTrue = (state, action) => {
    return updateObject(state, { likeLoading: true });
}

const setLikeLoadingFalse = (state, action) => {
    return updateObject(state, { likeLoading: false });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_POSTS_IN_STATE: return setPosts(state, action);
        case actionTypes.POST_LOADING_FALSE: return setPostLoadingFalse(state, action);
        case actionTypes.POST_LOADING_TRUE: return setPostLoadingTrue(state, action);
        case actionTypes.GET_LOADING_FALSE: return setGetLoadingFalse(state, action);
        case actionTypes.GET_LOADING_TRUE: return setGetLoadingTrue(state, action);
        case actionTypes.LIKE_LOADING_TRUE: return setLikeLoadingTrue(state, action);
        case actionTypes.LIKE_LOADING_FALSE: return setLikeLoadingFalse(state, action);
        default: return state;
    }
};

export default reducer;