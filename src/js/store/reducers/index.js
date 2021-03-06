import { handle } from 'redux-pack';
import * as types from '../constants/action-types';

const initialState = {
    albums: {},
    isLoading: false,
    error: true,
};

const mutations = {
    [types.GET_ALBUMS]: (state = initialState, action) => {
        return handle(state, action, {
            start: prevState => ({
              ...prevState,
              isLoading: true,
              error: false
            }),
            finish: prevState => ({ ...prevState, isLoading: false }),
            failure: prevState => ({ ...prevState, error: true }),
            success: prevState => ({ ...prevState, albums: action.payload }),
        });
    }
};

export const gallery = (state = initialState, action) => {
    const mutation = (mutations[action.type]);
    return (mutation) ? mutation(state, action) : state;
};