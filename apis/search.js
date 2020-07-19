import { get } from '../utils/request'

const PATH = '/search/api/study/'

/**
 * Serach a keyword
 * @param {string} keyword 
 * @param {number} offset 
 * @returns {Promise}
 */
export default async function search(keyword, offset = 0) {
    return get(PATH, {
        keyword,
        offset
    }).then(res=>{
        res.data.forEach(record => {
            let date = new Date(record.create_time)
            record.create_time_string = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        });

        return res
    })
}