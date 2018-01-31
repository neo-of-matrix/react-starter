### 9、React-Router ###
官方提供三个包

    yarn add react-router 不需要
    yarn add react-router-dom web端使用
    yarn add react-router-native 移动端使用

v2和v4版本区别比较大，本文介绍react-router-dom v4

v4引入组件思想，路由也是组件

三种组件

### router组件 ###
创建history对象
<BrowserRouter>和<HashRouter>两种组件

### BrowserRouter ###

BrowserRouter组件支持HTML5 API（pushState, replaceState and the popstate事件），适用于跟服务器请求和响应

### 属性 ###

basename 设置项目总的导航地址，适用于该项目是放在子页面，前斜线

getUserConfirmation: func 确认导航函数

forceRefresh: bool  强制刷新

keyLength: number 设置location.key长度

children: node  单一子元素渲染

### HashRouter ###

HashRouter组件适用于静态文件服务器
使用url的hash值进行路由跳转
不支持location.key和location.state

### 属性 ###

basename

getUserConfirmation: func

hashType: string 设置hash格式 slash noslash hasbang

children: node

    ReactDOM.render((
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    ), holder)

### route match匹配路由组件 ###

### <Route>和<Switch> ###

### Route组件 ###
path属性和当前location的pathname进行比较，匹配时渲染组件，不匹配渲染null
Route没有path属性，总是匹配
可以放在任何地方，经常是一个Route列表

### 属性 ###

match对象
Route的path怎样匹配URL

params:object 可选路径参数对象
isExact:boolean 路由完全匹配
path:string 用于匹配的路径
url:string URL的匹配部分，实际匹配路径

  Route component as this.props.match
  Route render as ({ match }) => ()
  Route children as ({ match }) => ()
  withRouter as this.props.match
  matchPath as the return value

location对象
代表当前路径，永远不变，可以携带state

  {
    key: 'ac3df4', // not with HashHistory!
    pathname: '/somewhere' //实际路径
    search: '?some=search-string',
    hash: '#howdy',
    state: {
      [userDefined]: true
    }
  }

  Route component as this.props.location
  Route render as ({ location }) => ()
  Route children as ({ location }) => ()
  withRouter as this.props.location

  const location = {
    pathname: '/somewhere',
    state: { fromDashboard: true }
  }
  
  <Link to={location}/>
  <Redirect to={location}/>
  history.push(location)
  history.replace(location)

history对象，history包

"browser history" 支持HTML5 API
"hash history" 传统hash模式
"memory history" 用于React-Native

length - (number)
//历史记录长度

action - (string)
//当前的action（PUSH/REPLACE/POP）

location - (object) pathname serach hash state
//当前location

push(path, [state]) - (function)
//添加一条新的历史记录

replace(path, [state]) - (function)
//代替当前的历史记录入口

go(n) - (function)
//跳转到第一条历史记录

goBack() - (function)
//go(-1)

goForward() - (function)
//go(1)

block(prompt) - (function)
//阻止跳转

Route组件的渲染属性
component/render/children

component渲染一个存在的组件

render: func渲染一个内联函数组件，传递当前作用域的属性和组件

    const FadingRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        <FadeIn>
          <Component {...props}/>
        </FadeIn>
      )}/>
    )

children:func
无论是否匹配，都渲染组件，除了match属性是null，做动画时用到

    <ul>
      <ListItemLink to="/somewhere"/>
      <ListItemLink to="/somewhere-else"/>
    </ul>

    const ListItemLink = ({ to, ...rest }) => (
      <Route path={to} children={({ match }) => (
        <li className={match ? 'active' : ''}>
          <Link to={to} {...rest}/>
        </li>
      )}/>
    )

path: string
匹配路径，格式参考

[https://github.com/pillarjs/path-to-regexp](https://github.com/pillarjs/path-to-regexp "https://github.com/pillarjs/path-to-regexp")

exact: bool
设置匹配规则path只匹配到第一个匹配的路由

  path匹配路径    location.pathname导航地址 exact 是否匹配
  /one      /one/two          true  no
  /one      /one/two          false yes

strict: bool
严格匹配，配合exact使用

  <Route strict path="/one/" component={About}/>
  path  location.pathname matches?
  /one/ /one        no
  /one/ /one/       yes
  /one/ /one/two      yes

  <Route exact strict path="/one" component={About}/>
  path  location.pathname matches?
  /one  /one        yes
  /one  /one/       no
  /one  /one/two      no

location: object

sensitive: bool
设置匹配规则是否区分大小写

### Switch组件 ###
通常用于Route列表
只渲染第一个匹配成功的Route组件
所有Route组件都没有匹配成功，渲染404组件（没有path属性的Route组件）

### 属性 ###

location: object
代替当前history的location通常是URL，匹配子元素

children: node
子节点
Route path /Redirect from
### navigation导航组件 ###
<Link><NavLink><Redirect>

### Link ###

属性

to:string
导航位置：pathname,search,hash

  <Link to='/courses?sort=name'/>

to:object

pathname 路径名
search 查询参数
hash hash值
state state继续存在location

    <Link to={{
      pathname: '/courses',
      search: '?sort=name',
      hash: '#the-hash',
      state: { fromDashboard: true }
    }}/>

replace:boolean
//替换当前的历史记录

innerRef:function
//

others:title className...

### NavLink ###
可以添加className属性名

### 属性 ###

activeClassName: string
//当点击链接时，添加className，默认为active

activeStyle: object
//当点击链接时，添加样式

exact: bool
//路由匹配时添加className和样式

strict: bool
//严格匹配

isActive: func
设置额外逻辑决定路由是否匹配

    // 偶数时匹配
    const oddEvent = (match, location) => {
      if (!match) {
        return false
      }
      const eventID = parseInt(match.params.eventID)
      return !isNaN(eventID) && eventID % 2 === 1
    }

    <NavLink
      to="/events/123"
      isActive={oddEvent}
    >Event 123</NavLink>

location: object

### Redirect ###
强制进行导航到新地址，覆盖当前的历史记录

to: string
使用的参数，必须是from里面有的

to: object
pathname/search/state

push: bool
设置为添加历史记录

from: string
用于Switch组件匹配路由，所有参数都能传给to，剩余参数忽略

exact: bool

strict: bool

### withRouter ###
获取history对象的属性和最近路由的match对象

使用场景：router嵌套route，route组件connect store 订阅state,路由跳转不会触发路由的render

不会监听location改变，不会重新渲染

    withRouter(connect(...)(MyComponent))
    compose(withRouter,connect(...))(MyComponent)

    MyComponent.WrappedComponent //用于测试组件
    wrappedComponentRef: func（{c => this.component = c}） //传递函数