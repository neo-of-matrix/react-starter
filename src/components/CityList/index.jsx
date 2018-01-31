import React from 'react'

import {Link} from 'mirrorx'
import './style.less'

class CityList extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div className="city-list-container">
                <h3>热门城市</h3>
                <ul className="clear-fix">
                    <li>
                        <Link to="/">
                            <span onClick={this.clickHandle.bind(this, '北京')}>北京</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span onClick={this.clickHandle.bind(this, '上海')}>上海</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span onClick={this.clickHandle.bind(this, '杭州')}>杭州</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span onClick={this.clickHandle.bind(this, '广州')}>广州</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span onClick={this.clickHandle.bind(this, '苏州')}>苏州</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span onClick={this.clickHandle.bind(this, '深圳')}>深圳</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span onClick={this.clickHandle.bind(this, '南京')}>南京</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span onClick={this.clickHandle.bind(this, '天津')}>天津</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span onClick={this.clickHandle.bind(this, '重庆')}>重庆</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span onClick={this.clickHandle.bind(this, '厦门')}>厦门</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span onClick={this.clickHandle.bind(this, '武汉')}>武汉</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span onClick={this.clickHandle.bind(this, '西安')}>西安</span>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
    clickHandle(newCity){
        var changeFn=this.props.changeFn
        changeFn(newCity)
    }
}

export default CityList