import { get } from '../utils/request'

const PATH =  '/search/api/sug/'

/**
 * get recommended search keywords
 * @param {string} keyword keyword string
 * @returns {Promise}
 */
export default async function getKeywords(keyword){
    return get(PATH, {
        keyword
    })
}