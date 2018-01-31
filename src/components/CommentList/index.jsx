import React from 'react'


import Item from './Item'

import './style.less'

class CommentList extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

    }
    render() {
        // 获取数据
        const data = this.props.data

        return (
            <div className="comment-list">
                {data.map((item, index) => {
                    return <Item key={index} data={item}/>
                })}
            </div>
        )
    }
}

export default CommentList