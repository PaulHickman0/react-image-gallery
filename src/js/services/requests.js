export const request = (url, method) => {
    return fetch(url, { method })
    .then(res => res.json())
}

export const requestGET = url => request(url, 'GET');