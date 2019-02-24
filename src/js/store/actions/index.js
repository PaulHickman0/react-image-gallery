import * as types from '../constants/action-types';
import { requestGET } from 'services/requests';

export const getAlbums = () => {
    return {
        type: types.GET_ALBUMS,
        promise: requestGET('https://jsonplaceholder.typicode.com/photos').then((images = []) => {
            const albums = {};
            images.forEach(({albumId = 'unknown', ...image}) => {
                albums[albumId] = albums[albumId] || [];
                albums[albumId].push(image);
            });
            return albums;
        }),
    };
}