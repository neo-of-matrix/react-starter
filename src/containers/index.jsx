import React from 'react'
import mirror, {actions,Switch, Route,withRouter,connect} from 'mirrorx'
import Home from './Home'
import City from './City'
import User from './User'
import Search from './Search'
import Detail from './Detail'
import Login from './Login'
import NotFound from './404'
import LocalStore from '../util/localStore'
import { CITYNAME } from '../config/localStoreKey'

class App extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            initDone: false
        }
    }
    render() {
        return (
            <div>
            {this.state.initDone
                ?
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path="/city" component={City} />
                    <Route path='/user' component={User}/>
                    <Route path='/search/:category?/:keyword?' component={Search}/>
                    <Route path='/detail/:id?' component={Detail}/>
                    <Route path='/login/:router?' component={Login}/>
                    <Route component={NotFound}/>
                </Switch>
                :<div>加载中...</div>}
            </div>
        )
    }
    componentDidMount() {
        let cityName = LocalStore.getItem(CITYNAME);
        if (cityName == null) {
            cityName = '北京'
        }
        actions.cityName.update(cityName)
        this.setState({
            initDone: true
        })

    }
}



mirror.model({
    name:'cityName',
    reducers:{
        update(state,data) {
            return data
        }
    }
})


mirror.model({
    name:'username',
    reducers:{
        update(state,data) {
            return data
        }
    }
})
mirror.model({
    name:'store',
    initialState:[],
    reducers:{
        update(state,data) {
            return data
        },
        add(state,data) {
            state.unshift(data)
            return state
        },
        rm(state,data){
            return state.filter(item => {
                if (item.id !== data.id) {
                    return item
                }
            });
        }
    }
})

export default withRouter(connect()(App))