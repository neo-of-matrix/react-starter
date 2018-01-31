import React from 'react'


import './style.less'

class LoginComponent extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loginname: ''
        }
    }
    render() {
        return (
            <div id="login-container">
                <div className="input-container phone-container">
                    <i className="icon-tablet"></i>
                    <input
                        type="text"
                        placeholder="输入手机号"
                        onChange={this.changeHandle.bind(this)}
                        value={this.state.loginname}
                    />
                </div>
                <div className="input-container password-container">
                    <i className="icon-key"></i>
                    <button>发送验证码</button>
                    <input type="text" placeholder="输入验证码"/>
                </div>
                <button className="btn-login" onClick={this.clickHandle.bind(this)}>登录</button>
            </div>
        )
    }
    changeHandle(e) {
        this.setState({
            loginname: e.target.value
        })
    }
    clickHandle() {
        const loginname = this.state.loginname
        const loginHandle = this.props.loginHandle
        loginHandle(loginname);
    }
}

export default LoginComponent