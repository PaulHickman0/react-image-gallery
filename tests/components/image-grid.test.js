import React from 'react';
import { shallow } from 'enzyme';
import ImageGrid from 'components/image-grid';

describe('Component - Image', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ImageGrid><div id="child" /></ImageGrid>);
    });

    test('ClassName prop displayed correctly', () => {
        wrapper.setProps({className: 'class'});
        expect(wrapper.hasClass('class')).toBe(true);
    });

    test('Display children when isLoading and error props are both false', () => {
        wrapper.setProps({isLoading: false, error: false});
        const child = wrapper.find('#child');
        expect(child.exists()).toBe(true);
    });

    test('Do not display children when isLoading prop is true', () => {
        wrapper.setProps({isLoading: true, error: false});
        const child = wrapper.find('#child');
        expect(child.exists()).toBe(false);
    });

    test('Do not display children when error prop is true', () => {
        wrapper.setProps({isLoading: false, error: true});
        const child = wrapper.find('#child');
        expect(child.exists()).toBe(false);
    });

    test('Display loader when isLoading prop is true', () => {
        wrapper.setProps({isLoading: true});
        const loader = wrapper.find('#c-image-grid__loader');
        expect(loader.exists()).toBe(true);
    });

    test('Do not display loader when isLoading prop is false', () => {
        wrapper.setProps({isLoading: false});
        const loader = wrapper.find('#c-image-grid__loader');
        expect(loader.exists()).toBe(false);
    });

    test('Display error when error prop is true', () => {
        wrapper.setProps({error: true});
        const loader = wrapper.find('#c-image-grid__error');
        expect(loader.exists()).toBe(true);
    });

    test('Do not display error when error prop is false', () => {
        wrapper.setProps({error: false});
        const loader = wrapper.find('#c-image-grid__error');
        expect(loader.exists()).toBe(false);
    });

});
