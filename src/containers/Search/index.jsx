import React from 'react'
import {Route} from 'mirrorx'
import SearchHeader from '../../components/SearchHeader'
import SearchList from './subpage/List'
class Search extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const params = this.props.match.params
        return (
            <div>
            <SearchHeader keyword={params.keyword}/>
            <SearchList category={params.category} keyword={params.keyword}/>
            </div>
        )
    }
}
export default Search