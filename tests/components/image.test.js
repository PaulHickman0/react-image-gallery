import React from 'react';
import { shallow } from 'enzyme';
import Lightbox from 'react-image-lightbox';
import Image from 'components/image';

describe('Component - Image', () => {

    let wrapper, instance;

    beforeEach(() => {
        wrapper = shallow(<Image />);
        instance = wrapper.instance();
    });

    test('Displays title correctly', () => {
        wrapper.setProps({title: 'test'});
        const title = wrapper.find('h5').text();
        expect(title).toBe('test');
    });

    test('Display image correctly', () => {
        wrapper.setProps({thumbnailUrl: 'test'});
        const image = wrapper.find('img');
        expect(image.prop('src')).toBe('test');
    });

    test('Correct onClick method passed to image', () => {
        wrapper.setProps({thumbnail: 'test'});
        const image = wrapper.find('img');
        expect(image.prop('onClick')).toBe(instance.togglePreview);
    });

    describe('previewMode', () => {

        test('Show lightbox when isPreviewMode true', () => {
            wrapper.setState({isPreviewMode: true});
            const lightbox = wrapper.find(Lightbox);
            expect(lightbox.exists()).toBe(true);
        });

        test('Correct url passed to lightbox when isPreviewMode true', () => {
            const url = 'test_url';
            wrapper.setState({isPreviewMode: true});
            wrapper.setProps({ url });
            const lightbox = wrapper.find(Lightbox);
            expect(lightbox.prop('mainSrc')).toBe(url);
        });

        test('Correct onCloseRequest method passed to lightbox when isPreviewMode true', () => {
            wrapper.setState({isPreviewMode: true});
            const lightbox = wrapper.find(Lightbox);
            expect(lightbox.prop('onCloseRequest')).toBe(instance.togglePreview);
        });

        test('Do not show lightbox when isPreviewMode false', () => {
            wrapper.setState({isPreviewMode: false});
            const lightbox = wrapper.find(Lightbox);
            expect(lightbox.exists()).toBe(false);
        });

    });

    describe('togglePreview', () => {

        test('Sets isPreviewMode state to true when previously false', () => {
            wrapper.setState({isPreviewMode: false});
            instance.togglePreview();
            expect(wrapper.state('isPreviewMode')).toBe(true);
        });

        test('Sets isPreviewMode state to false when previously true', () => {
            wrapper.setState({isPreviewMode: true});
            instance.togglePreview();
            expect(wrapper.state('isPreviewMode')).toBe(false);
        });

    });

});
