import * as ActionTypes from './ActionTypes.js';

export const Promotions = (state = {
    isLoading: true,
    errorMessage: null,
    promotions: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOTIONS:
            return { ...state, isLoading: false, errorMessage: null, promotions: action.payload }

        case ActionTypes.PROMOTIONS_LOADING:
            return { ...state, isLoading: true, errorMessage: null, promotions: [] }

        case ActionTypes.PROMOTIONS_FAILED:
            return { ...state, isLoading: false, errorMessage: action.payload, promotions: []  }

        default:
            return state;
    }
}