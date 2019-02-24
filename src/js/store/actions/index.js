import * as types from '../constants/action-types';
import { requestGET } from 'services/requests';

/**
 * Make request to get images
 * Sorts images into albums
 * Limits images to 300
 * @return {Object}
 */
export const getAlbums = () => {
    return {
        type: types.GET_ALBUMS,
        promise: requestGET('https://jsonplaceholder.typicode.com/photos').then((images = []) => {
            const albums = {};
            images = images.slice(0, 300);
            images.forEach(({albumId = 'unknown', ...image}) => {
                albums[albumId] = albums[albumId] || [];
                albums[albumId].push(image);
            });
            return albums;
        }),
    };
}