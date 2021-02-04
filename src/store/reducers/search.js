import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    SearchModalOn: false,
    searchContent: '',
    searchedUsers: null,
    searchedPosts: null
}

const setSearchModalTrue = (state, action) => {
    return updateObject(state, { SearchModalOn: true });
};

const setSearchModalFalse = (state, action) => {
    return updateObject(state, { SearchModalOn: false });
};

const setSearchContent = (state, action) => {
    return updateObject(state, { searchContent: action.searchContent})
}

const setSearchedUsers = (state, action) => {
    return updateObject(state, { searchedUsers: action.searchUsers})
}

const setSearchedPosts = (state, action) => {
    return updateObject(state, { searchedPosts: action.searchPosts})
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_SEARCH_MODAL_TRUE: return setSearchModalTrue(state, action);
        case actionTypes.SET_SEARCH_MODAL_FALSE: return setSearchModalFalse(state, action);
        case actionTypes.SET_SEARCH_CONTENT: return setSearchContent(state, action);
        case actionTypes.SET_SEARCHED_USERS: return setSearchedUsers(state, action);
        case actionTypes.SET_SEARCHED_POSTS: return setSearchedPosts(state, action);
        default: return state;
    }
};

export default reducer;