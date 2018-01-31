import React from 'react'
import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'
import LocalStore from '../../util/localStore'
import {CITYNAME} from '../../config/localStoreKey'
import {actions,connect} from 'mirrorx'

class City extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                <Header title="选择城市"/>
                <CurrentCity cityName={this.props.cityName}/>
                <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }
    changeCity(newCity){
        if (newCity==null) {
            return
        }
        actions.cityName.update(newCity)
        LocalStore.setItem(CITYNAME,newCity)
    }
}







function mapStateToProps(state) {
    return {
        cityName:state.cityName
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)