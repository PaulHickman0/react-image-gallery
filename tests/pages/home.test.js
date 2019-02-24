import React from 'react';
import { shallow } from 'enzyme';
import { Home } from 'pages/home';
import ImageGrid from 'components/image-grid';
import Album from 'components/album';

describe('Pages - Home', () => {

    let wrapper, instance;

    beforeEach(() => {
        wrapper = shallow(<Home />);
        instance = wrapper.instance();
    });

    test('isLoading prop passed to ImageGrid', () => {
        wrapper.setProps({isLoading: true});
        const imageGrid = wrapper.find(ImageGrid);
        expect(imageGrid.prop('isLoading')).toBe(true);
    });

    test('error prop passed to ImageGrid', () => {
        wrapper.setProps({error: true});
        const imageGrid = wrapper.find(ImageGrid);
        expect(imageGrid.prop('error')).toBe(true);
    });

    test('Correct Album components passed as children to ImageGrid', () => {

        const albums = {
            '1': [{
                thumbnailUrl: 'url_1'
            }, {
                thumbnailUrl: 'url_2'
            }],
            '2': [{
                thumbnailUrl: 'url_3'
            }]
        };

        wrapper.setProps({ albums });
        const album_1 = wrapper.find(Album).at(0);

        expect(album_1.prop('id')).toBe('1');
        expect(album_1.prop('images')).toBe(albums['1']);
        expect(album_1.prop('thumbnail')).toBe('url_1');

        const album_2 = wrapper.find(Album).at(1);

        expect(album_2.prop('id')).toBe('2');
        expect(album_2.prop('images')).toBe(albums['2']);
        expect(album_2.prop('thumbnail')).toBe('url_3');

    });

    describe('componentDidMount', () => {

        test('Calls getAlbums if albums are not already loaded', () => {
            const albums = {};
            const getAlbums = jest.fn();
            wrapper.setProps({ albums, getAlbums });

            instance.componentDidMount();

            expect(getAlbums).toHaveBeenCalled();
        });

        test('Does not calls getAlbums if albums are already loaded', () => {
            const albums = {
                '1': [{}]
            };
            const getAlbums = jest.fn();
            wrapper.setProps({ albums, getAlbums });

            instance.componentDidMount();

            expect(getAlbums).not.toHaveBeenCalled();
        });

    });

});
