import {fetchMockData} from '../../../mock/server.js';
import homeAdData from '../../../mock/home/ad.js';
import homeListData from '../../../mock/home/list.js';

export function getAdData () {
  return fetchMockData('/api/homead', homeAdData);
}

export function getListData (city, page) {
  return fetchMockData('/api/homelist/' + encodeURIComponent(city) + '/' + page, homeListData);
}
