import {fetchMockData} from '../../../mock/server.js';
import searchListData from '../../../mock/search/list.js';
export function getSearchData (page, cityName, category, keyword) {
  const keywordStr = keyword ? '/' + keyword : '';
  return fetchMockData('/api/search/' + page + '/' + cityName + '/' + category + keywordStr, searchListData);
}
