import React from 'react'
import { connect,withRouter,actions } from 'mirrorx';
import Header from '../../components/Header'
import LoginComponent from '../../components/LoginComponent'
class Login extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checking: true
        }
    }
    render() {
        return (
            <div>
                <Header title="登录" />
                {
                    this.state.checking?
                    <div>等待中</div>:
                    <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
                }
            </div>
        )
    }
    componentDidMount() {
        this.doCheck()
    }
    loginHandle(username) {
        actions.username.update(username)

        const params = this.props.match.params

        const router = params.router

        if (router) {
            actions.routing.push(decodeURIComponent(router))
        } else {
            this.goUserPage()
        }
    }
    doCheck() {
        const username = this.props.username
        if (username) {
            this.goUserPage()
        } else {
            this.setState({
                checking: false
            })
        }
    }
    goUserPage() {
        actions.routing.push('/user')
    }
}




function mapStateToProps(state) {
    return {
        username: state.username
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login))