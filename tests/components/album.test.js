import React from 'react';
import { shallow } from 'enzyme';
import { CAlbum as Album } from 'components/album';

describe('Component - Album', () => {

    let wrapper, instance;

    beforeEach(() => {
        wrapper = shallow(<Album />);
        instance = wrapper.instance();
    });

    test('Displays title correctly', () => {
        wrapper.setProps({id: 'test'});
        const title = wrapper.find('h3').text();
        expect(title).toBe('Album test');
    });

    test('Display image correctly', () => {
        wrapper.setProps({thumbnail: 'test'});
        const image = wrapper.find('img');
        expect(image.prop('src')).toBe('test');
    });

    test('div onClick calls navigateToAlbum with correct params', () => {
        const id = '123';
        wrapper.setProps({ id });
        instance.navigateToAlbum = jest.fn();
        wrapper.find('.c-album__thumb').simulate('click');
        expect(instance.navigateToAlbum).toHaveBeenCalledWith(id);
    });

    describe('navigateToAlbum', () => {

        test('Pushing correct route', () => {
            const history = {
                push: jest.fn()
            };
            wrapper.setProps({ history });

            instance.navigateToAlbum('123');
            expect(history.push).toHaveBeenCalledWith('/album/123');
            
        });

    });

});
