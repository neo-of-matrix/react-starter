import React from 'react'
import {getAdData} from '../../../fetch/home/home'
import HomeAd from '../../../components/HomeAd'
class AD extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state={
            data:[]
        }
    }
    render() {
        return (
            <div>
                {this.state.data.length
                ?<HomeAd data={this.state.data}/>
                :<div>加载中</div>}
            </div>
        )
    }
    componentDidMount() {
        const result =getAdData()
        result.then((res)=>{
            return res.json()
        }).then((json)=>{
            const data=json;
            if (data.length) {
                this.setState(prevState=>({
                    data:prevState.data.concat(data)
                }))
            }
        })
    }
}
export default AD
