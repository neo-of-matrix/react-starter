import {fetchMockData, fetchPostMock} from '../../../mock/server.js';
import orderList from '../../../mock/orderlist/orderList.js';

export function getOrderListData (username) {
  return fetchMockData('/api/orderlist/' + username, orderList);
}

export function postComment (id, comment, star) {
  return fetchPostMock('/api/submitComment', {
    id: id,
    comment: comment,
    star: star
  });
}
