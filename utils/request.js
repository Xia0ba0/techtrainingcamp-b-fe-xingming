import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'https://i.snssdk.com'

// request interceptor
axios.interceptors.request.use(
    config => {
        config.data = JSON.stringify(config.data)
        config.headers = {
            'Content-Type': 'application/json'
        }
        return config
    },

    error => {
        return Promise.reject(error)
    }
)

//  response interceptor
axios.interceptors.response.use(
    response => {
        if (response.status === 200 && response.data.code === 0) {
            return Promise.resolve(response)
        } else {
            console.error('Oops! Something Went Wrong...')
            return Promise.reject(response)
        }
    },

    err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    console.error('400 Bad Request')
                    break;
                case 401:
                    console.error('401 Unauthorized')
                    break;
                case 403:
                    console.error('403 Forbidden')
                    break;
                case 404:
                    console.error('404 Not Found')
                    break;
                case 405:
                    console.error('405 Method Not Allowed')
                    break;
                case 408:
                    console.error('408 Request Timeout')
                    break;
                case 500:
                    console.error('500 Internal Server Error')
                    break;
                case 501:
                    console.error('501 Not Implemented')
                    break;
                case 502:
                    console.error('502 Bad Gateway')
                    break;
                case 503:
                    console.error('503 Service Unavailable')
                    break;
                case 504:
                    console.error('504 Gateway Timeout')
                    break;
                case 505:
                    console.error('505 HTTP Version Not Supported')
                    break;
                default:
                    console.error(`Wrong Connection ${err.response.status}`)
            }
        } else {
            console.error('Fail to connect Server')
        }
        return Promise.reject(err.response)
    }
)

/**
 * Encapsulation of GET method
 * 
 * @param {string} path Relative path of URL
 * @param {object} params  GET method parameters
 * @returns {Promise}
 */
export function get(path, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(path, {
            params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}


/**
 * @todo There are many other methods to be wrapped, but GET is enough for this project
 */
