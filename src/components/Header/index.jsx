import React from 'react'

import { withRouter,actions } from 'mirrorx';
import './style.less'

class Header extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

    }
    render() {
        return (
            <div id="common-header">
                <span className="back-icon" onClick={this.clickHandle.bind(this)}>
                    <i className="icon-chevron-left"></i>
                </span>
                <h1>{this.props.title}</h1>
            </div>
        )
    }
    clickHandle() {
        const backRouter = this.props.backRouter
        if (backRouter) {
            actions.routing.push(backRouter)
        } else {
            actions.routing.goBack()
        }
    }
}

export default withRouter(Header)