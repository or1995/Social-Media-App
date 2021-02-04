import * as actionTypes from './actionTypes';

export const setSearchModalTrue = () => {
    return {
        type: actionTypes.SET_SEARCH_MODAL_TRUE
    }
}

export const setSearchModalFalse = () => {
    return {
        type: actionTypes.SET_SEARCH_MODAL_FALSE
    }
}

export const setSearchContent = (content) => {
    return {
        type: actionTypes.SET_SEARCH_CONTENT,
        searchContent: content
    }
}

export const setSearchedUsers = (users) => {
    return {
        type: actionTypes.SET_SEARCHED_USERS,
        searchUsers: users
    }
}

export const setSearchedPosts = (posts) => {
    return {
        type: actionTypes.SET_SEARCHED_POSTS,
        searchPosts: posts
    }
}