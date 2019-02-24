import fetchMock from 'fetch-mock';
import * as Actions from 'store/actions';
import * as types from 'store/constants/action-types';

describe('Actions', () => {

    describe('getAlbums', () => {

        beforeEach(() => {
            fetchMock.get('https://jsonplaceholder.typicode.com/photos', []);
        });

        afterEach(() => {
            fetchMock.restore();
        });

        test('Correct type set', () => {
            const { type } = Actions.getAlbums();
            expect(type).toBe(types.GET_ALBUMS);
        });

        test('Calls correct endpoint', done => {
            const { promise } = Actions.getAlbums();

            promise.then(() => {
                expect(fetchMock.called('https://jsonplaceholder.typicode.com/photos')).toBe(true);
                done();
            })
            .catch(done.fail)
        });

        describe('Sorts images from response into albums correctly', () => {
            
            test('All images present with album IDs', done => {

                const data = [{
                    albumId: 1,
                    id: 1,
                    title: 'Title 1',
                    url: 'test_url_1',
                    thumbnailUrl: 'thumb_1'
                },{
                    albumId: 2,
                    id: 2,
                    title: 'Title 2',
                    url: 'test_url_2',
                    thumbnailUrl: 'thumb_2'
                },{
                    albumId: 3,
                    id: 3,
                    title: 'Title 3',
                    url: 'test_url_3',
                    thumbnailUrl: 'thumb_3'
                },{
                    albumId: 1,
                    id: 4,
                    title: 'Title 4',
                    url: 'test_url_4',
                    thumbnailUrl: 'thumb_4'
                }, {
                    albumId: 1,
                    id: 5,
                    title: 'Title 5',
                    url: 'test_url_5',
                    thumbnailUrl: 'thumb_5'
                }, {
                    albumId: 3,
                    id: 6,
                    title: 'Title 6',
                    url: 'test_url_6',
                    thumbnailUrl: 'thumb_6'
                }, {
                    albumId: 3,
                    id: 7,
                    title: 'Title 7',
                    url: 'test_url_7',
                    thumbnailUrl: 'thumb_7'
                }];

                const expected = {
                    '1': [{
                        id: 1,
                        title: 'Title 1',
                        url: 'test_url_1',
                        thumbnailUrl: 'thumb_1'
                    },{
                        id: 4,
                        title: 'Title 4',
                        url: 'test_url_4',
                        thumbnailUrl: 'thumb_4'
                    }, {
                        id: 5,
                        title: 'Title 5',
                        url: 'test_url_5',
                        thumbnailUrl: 'thumb_5'
                    }],
                    '2': [{
                        id: 2,
                        title: 'Title 2',
                        url: 'test_url_2',
                        thumbnailUrl: 'thumb_2'
                    }],
                    '3': [{
                        id: 3,
                        title: 'Title 3',
                        url: 'test_url_3',
                        thumbnailUrl: 'thumb_3'
                    }, {
                        id: 6,
                        title: 'Title 6',
                        url: 'test_url_6',
                        thumbnailUrl: 'thumb_6'
                    }, {
                        id: 7,
                        title: 'Title 7',
                        url: 'test_url_7',
                        thumbnailUrl: 'thumb_7'
                    }]
                };

                fetchMock.restore().get('https://jsonplaceholder.typicode.com/photos', data);
                const { promise } = Actions.getAlbums();

                promise.then(albums => {
                    expect(albums).toEqual(expected);
                    done();
                })
                .catch(done.fail);

            });

            test('Some images without album IDs', done => {

                const data = [{
                    albumId: 1,
                    id: 1,
                    title: 'Title 1',
                    url: 'test_url_1',
                    thumbnailUrl: 'thumb_1'
                },{
                    albumId: 2,
                    id: 2,
                    title: 'Title 2',
                    url: 'test_url_2',
                    thumbnailUrl: 'thumb_2'
                },{
                    albumId: 3,
                    id: 3,
                    title: 'Title 3',
                    url: 'test_url_3',
                    thumbnailUrl: 'thumb_3'
                },{
                    id: 4,
                    title: 'Title 4',
                    url: 'test_url_4',
                    thumbnailUrl: 'thumb_4'
                }, {
                    albumId: 1,
                    id: 5,
                    title: 'Title 5',
                    url: 'test_url_5',
                    thumbnailUrl: 'thumb_5'
                }, {
                    albumId: 3,
                    id: 6,
                    title: 'Title 6',
                    url: 'test_url_6',
                    thumbnailUrl: 'thumb_6'
                }, {
                    id: 7,
                    title: 'Title 7',
                    url: 'test_url_7',
                    thumbnailUrl: 'thumb_7'
                }];

                const expected = {
                    '1': [{
                        id: 1,
                        title: 'Title 1',
                        url: 'test_url_1',
                        thumbnailUrl: 'thumb_1'
                    }, {
                        id: 5,
                        title: 'Title 5',
                        url: 'test_url_5',
                        thumbnailUrl: 'thumb_5'
                    }],
                    '2': [{
                        id: 2,
                        title: 'Title 2',
                        url: 'test_url_2',
                        thumbnailUrl: 'thumb_2'
                    }],
                    '3': [{
                        id: 3,
                        title: 'Title 3',
                        url: 'test_url_3',
                        thumbnailUrl: 'thumb_3'
                    }, {
                        id: 6,
                        title: 'Title 6',
                        url: 'test_url_6',
                        thumbnailUrl: 'thumb_6'
                    }],
                    'unknown': [{
                        id: 4,
                        title: 'Title 4',
                        url: 'test_url_4',
                        thumbnailUrl: 'thumb_4'
                    }, {
                        id: 7,
                        title: 'Title 7',
                        url: 'test_url_7',
                        thumbnailUrl: 'thumb_7'
                    }]
                };

                fetchMock.restore().get('https://jsonplaceholder.typicode.com/photos', data);
                const { promise } = Actions.getAlbums();

                promise.then(albums => {
                    expect(albums).toEqual(expected);
                    done();
                })
                .catch(done.fail);
            });

            test('Limits images to 300', done => {

                const images = [];
                for (let i = 0; i < 400; i++) {
                    images.push({
                        albumId: i,
                        id: i,
                        title: `Title ${i}`,
                        url: `test_url_${i}`,
                        thumbnailUrl: `thumb_${i}`
                    });
                }

                expect(images.length).toEqual(400);

                fetchMock.restore().get('https://jsonplaceholder.typicode.com/photos', images);
                const { promise } = Actions.getAlbums();

                promise.then(albums => {
                    expect(Object.keys(albums).length).toEqual(300);
                    done();
                })
                .catch(done.fail);
            });

        });

    });

});
