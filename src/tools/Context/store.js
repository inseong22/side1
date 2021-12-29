import {createStore} from 'redux';

const ADD = "ADD";
const DELETE = "DELETE";

export const getUser = user => {
    return {
        type:ADD,
        user
    }
}

const reducer = (state = [], action) => {
    switch(action.type) {
        case ADD: 
            return 

        case DELETE:


        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;