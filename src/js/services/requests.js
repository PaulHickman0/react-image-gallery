
/**
 * Makes a fetch request with specified options
 * @param  {String} url      URL for request
 * @param  {String} method   Method for request
 * @return {Promise}         Resolved / rejected with request
 */
export const request = (url, method) => {
    return fetch(url, { method })
    .then(res => res.json())
}


/**
 * GET Fetch request
 *   Calls 'request' with correct method param
 * @param  {String} url  URL for request
 * @return {Promise}         Resolved / rejected with request
 */
export const requestGET = url => request(url, 'GET');