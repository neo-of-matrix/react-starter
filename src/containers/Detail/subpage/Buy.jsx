import React from 'react'
import {connect,withRouter,actions } from 'mirrorx'
import BuyAndStore from '../../../components/BuyAndStore'
class Buy extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isStore: false
        }
    }
    render() {
        return (
            <div>
                <BuyAndStore
                isStore={this.state.isStore}
                buyHandle={this.buyHandle.bind(this)}
                storeHandle={this.storeHandle.bind(this)}/>
            </div>
        )
    }
    buyHandle() {
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }
        actions.routing.push('/user')
    }
    storeHandle() {
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }
        const id = this.props.id

        if (this.state.isStore) {
            actions.store.rm(id)
        } else {
            actions.store.add(id)
        }
        this.setState({
            isStore: !this.state.isStore
        })
    }
    loginCheck() {
        const id = this.props.id
        const username = this.props.username
        if (!username) {
            actions.routing.push('/login/' + encodeURIComponent('/detail/' + id))
            return false
        } else {
            return true
        }
    }
    checkStoreState() {
        const id = this.props.id
        const store = this.props.store
        store.some(item => {
            if (item === id) {
                this.setState({
                    isStore: true
                })
                return true
            }
        })
    }
    componentDidMount() {
        this.checkStoreState()
    }
}





function mapStateToProps(state) {
    return {
        username: state.username,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy))