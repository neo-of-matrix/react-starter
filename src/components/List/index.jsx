import React from 'react'

import './style.less'
import Item from './Item'
class ListComponent extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

    }
    render() {
        const data=this.props.data;
        return (
            <div  className="list-container">
                {data.map((item,index)=>{
                    return <Item key={index} data={item}/>
                })}
            </div>
        )
    }
}

export default ListComponent