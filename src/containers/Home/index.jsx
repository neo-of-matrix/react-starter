import React from 'react'
import {connect} from 'mirrorx'
import HomeHeader from '../../components/HomeHeader'
import Category from '../../components/Category'
import AD from './subpage/AD'
import List from './subpage/List'
class Home extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                <HomeHeader cityName={this.props.cityName}/>
                <Category />
                <List cityName={this.props.cityName} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cityName:state.cityName
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)