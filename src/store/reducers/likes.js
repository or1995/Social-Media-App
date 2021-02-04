import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    buttonDisabled: false
}

const likeButtonTrue = (state, action) => {
    return updateObject(state, { buttonDisabled: true });
};

const likeButtonFalse = (state, action) => {
    return updateObject(state, { buttonDisabled: false });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LIKE_BUTTON_TIMEOUT_TRUE: return likeButtonTrue(state, action);
        case actionTypes.LIKE_BUTTON_TIMEOUT_FALSE: return likeButtonFalse(state, action);
        default: return state;
    }
};

export default reducer;