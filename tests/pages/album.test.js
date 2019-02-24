import React from 'react';
import { shallow } from 'enzyme';
import { Album } from 'pages/album';
import ImageGrid from 'components/image-grid';
import Image from 'components/image';

describe('Pages - Album', () => {

    let wrapper, instance;

    beforeEach(() => {
        wrapper = shallow(<Album />);
        instance = wrapper.instance();
    });

    test('Correct title displayed', () => {
        const match = {
            params: {
                albumId: '2'
            }
        }
        wrapper.setProps({ match });
        const title = wrapper.find('h1').text();
        expect(title).toBe('Album 2');
    });

    test('Correct title displayed when no albumId', () => {
        const title = wrapper.find('h1').text();
        expect(title).toBe('Album Unknown');
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

    test('Correct Image components passed as children to ImageGrid', () => {

        const images = [{
            id: '1',
            thumbnailUrl: 'url_1'
        }, {
            id: '2',
            thumbnailUrl: 'url_2'
        }];

        instance.getAlbumImages = () => images;
        instance.forceUpdate(); //rerender

        const image_1 = wrapper.find(Image).at(0);

        expect(image_1.prop('id')).toBe('1');
        expect(image_1.prop('thumbnailUrl')).toBe('url_1');

        const image_2 = wrapper.find(Image).at(1);

        expect(image_2.prop('id')).toBe('2');
        expect(image_2.prop('thumbnailUrl')).toBe('url_2');

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

    describe('getAlbumImages', () => {

        test('Returns correct album when present', () => {
            const albums = {
                '1': [],
                '2': [{
                    url: 'url_1'
                }]
            }
            wrapper.setProps({ albums });
            const images = instance.getAlbumImages('2');
            expect(images).toEqual(albums['2']);
        });
        
        test('Returns empty array when id not present', () => {
            const albums = {
                '1': [],
                '2': [{
                    url: 'url_1'
                }]
            }
            wrapper.setProps({ albums });
            const images = instance.getAlbumImages('5');
            expect(images).toEqual([]);
        });

    });

});
