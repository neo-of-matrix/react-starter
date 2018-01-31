import React from 'react'
import mirror, {render, Router} from 'mirrorx'
import App from './containers'
import './static/css/common.less'

mirror.defaults({
  historyMode: 'browser'
})

render(
  <Router basename="/">
    <App/>
  </Router>
, document.getElementById('root'))