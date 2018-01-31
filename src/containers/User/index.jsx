import React from 'react'
import {connect} from 'mirrorx'
import Header from '../../components/Header'
import UserInfo from '../../components/UserInfo'
import OrderList from './subpage/OrderList.jsx'
class Home extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const username=this.props.username
        const cityName=this.props.cityName
        return (
            <div>
                <Header title="用户中心" backRouter="/" />
                <UserInfo username={username} city={cityName}/>
                <OrderList username={username} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username:state.username,
        cityName:state.cityName
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)