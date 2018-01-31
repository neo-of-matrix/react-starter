import React from 'react';
import { getListData } from '../../../fetch/home/home';
import ListComponent from '../../../components/List';
import LoadMore from '../../../components/LoadMore';
import './style.less';
class List extends React.PureComponent {
  constructor (props, context) {
    super(props, context);
    this.state = {
      data: [],
      hasMore: false,
      isLoadingMore: false,
      page: 1
    };
    this.loadMoreData=this.loadMoreData.bind(this)
  }
  render () {
    return (
      <div>
        <h2 className='home-list-title'>猜你喜欢</h2>
        <div>
          {this.state.data.length
            ? <ListComponent data={this.state.data} />
            : <div>加载中</div>}
          {this.state.hasMore
            ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData} />
            : ''}
        </div>
      </div>
    );
  }
  componentDidMount () {
    this.loadFirstPageData();
  }
  loadFirstPageData () {
    const cityName = this.props.cityName;
    const result = getListData(cityName, 0);
    this.resultHandle(result);
  }
  loadMoreData () {
    this.setState({
      isLoadingMore: true
    });
    const cityName = this.props.cityName;
    const page = this.state.page;
    const result = getListData(cityName, page);
    this.resultHandle(result);
    this.setState({
      page: page + 1,
      isLoadingMore: false
    });
  }
  resultHandle (result) {
    result.then((res) => {
      return res.json();
    }).then((json) => {
      const hasMore = json.hasMore;
      const data = json.data;
      this.setState({
        hasMore: hasMore,
        data: this.state.data.concat(data)
      });
    });
  }
}
export default List;
