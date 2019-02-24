import * as types from '../constants/action-types';
import { requestGET } from 'services/requests';

export const getImages = () => {
    return {
        type: types.GET_IMAGES,
        promise: requestGET('https://jsonplaceholder.typicode.com/photos?thisg'),
    };
}