import * as ActionTypes from './ActionTypes.js';

export const Feedbacks = (state = {
    feedbacks: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FEEDBACK:
            var feedback = action.payload;
            console.log("Current state is: " + JSON.stringify(feedback));
            alert("Current state is: " + JSON.stringify(feedback));        
    
            return state;

        default:
            return state;
    }
}