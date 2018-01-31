import React from 'react'
import Header from '../../components/Header'
import Info from './subpage/Info.jsx'
import Comment from './subpage/Comment.jsx'
import Buy from './subpage/Buy.jsx'
class Detail extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const id=this.props.match.params.id
        return (
            <div>
                <Header title="商户详情"/>
                <Info id={id}/>
                <Buy id={id}/>
                <Comment />
            </div>
        )
    }
}
export default Detail