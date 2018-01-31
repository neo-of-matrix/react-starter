import {fetchMockData} from '../../../mock/server.js';
import detailInfo from '../../../mock/detail/info.js';
import detailComment from '../../../mock/detail/comment.js';
export function getInfoData (id) {
  return fetchMockData('/api/detail/info/' + id, detailInfo);
}

export function getCommentData (page, id) {
  return fetchMockData('/api/detail/comment/' + page + '/' + id, detailComment);
}
