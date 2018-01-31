import { get } from '../src/fetch/get.js'
import { post } from '../src/fetch/post.js'
import fetchMock from 'fetch-mock'
export function fetchMockData(url, data) {
    fetchMock.get(url, data)
    const result = get(url)
    fetchMock.restore()
    return result
}
export function fetchPostMock(url) {
    fetchMock.mock({
        matcher: url,
        response: {
            errno: 0,
            msg: 'ok'
        }
    })
    const result = post(url)
    fetchMock.restore()
    return result
}