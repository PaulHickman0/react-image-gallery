import fetchMock from 'fetch-mock';
import * as Requests from 'services/requests';

describe('Services - Requests', () => {

    describe('requestGET', () => {

        const data = {
            name: 'Jim',
            gender: 'male'
        };
        const url = 'test-url';

        beforeEach(() => {
            fetchMock.get(url, data)
        });

        afterEach(() => {
            fetchMock.restore();
        });

        test('Promise returns parsed data', done => {
            
            Requests.requestGET(url)
            .then(response => {
                expect(response).toEqual(data);
                done();
            })
            .catch(done.fail)

        });

    });

});
