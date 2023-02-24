import * as ActionTypes from './ActionTypes.js';

export const Dishes = (state = {
    isLoading: true,
    errorMessage: null,
    dishes: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return { ...state, isLoading: false, errorMessage: null, dishes: action.payload }

        case ActionTypes.DISHES_LOADING:
            return { ...state, isLoading: true, errorMessage: null, dishes: [] }

        case ActionTypes.DISHES_FAILED:
            return { ...state, isLoading: false, errorMessage: action.payload}

        default:
            return state;
    }
}