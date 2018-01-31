import React from 'react'
import { getOrderListData,postComment } from '../../../fetch/user/orderlist'

import OrderListComponent from '../../../components/OrderListComponent'

import './style.less'

class OrderList extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        }
    }
    render() {
        return (
            <div className="order-list-container">
                <h2>您的订单</h2>
                {
                    this.state.data.length
                    ? <OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>
                    : ''
                }
            </div>
        )
    }
    componentDidMount() {
        // 获取订单数据
        const username = this.props.username
        if (username) {
            this.loadOrderList(username)
        }
    }
    loadOrderList(username) {
        const result = getOrderListData(username)
        result.then(res => {
            return res.json()
        }).then(json => {
            // 获取数据
            this.setState(prevState=>({
                data:prevState.data.concat(json)
            }))
        }).catch(ex => {
            if (__DEV__) {
                console.error('用户主页“订单列表”获取数据报错, ', ex.message)
            }
        })
    }
    submitComment(id,value,star,callback){
        const result=postComment(id,value,star)
        result.then(res=>{
            return res.json()
        }).then(json=>{
            if (json.errno===0) {
                callback()
            }
        })
    }
}

export default OrderList