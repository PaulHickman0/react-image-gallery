import * as types from '../constants/action-types';

const initialState = {

};

const mutations = {
    [types.SET_IMAGES]: (state, action) => {
        return {
            ...state,
            images: action.payload
        };
    }
};

export const app = (state = initialState, action) => {
    const mutation = (mutations[action.type]);
    return (mutation) ? mutation(state, action) : state;
};