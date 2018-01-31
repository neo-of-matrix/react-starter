import React from 'react'
import {getInfoData} from '../../../fetch/detail/detai.js'
import DeatilInfo from '../../../components/DeatilInfo'
class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            info:{}
        }
    }
    render() {
        return (
            <div>
                {this.state.info
                ?<DeatilInfo data={this.state.info} />
                :''}
            </div>
        )
    }
    componentDidMount() {
        var id=this.props.id
        var result=getInfoData(id)
        result.then(res=>{
            return res.json()
        }).then(json=>{
            this.setState(prevState => ({
                info: json
            }));
        })
    }
}

export default Info