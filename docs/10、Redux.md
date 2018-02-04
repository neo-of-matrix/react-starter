### 10、Redux ###

node-uuid 生成唯一标识符
lodash JavaScript工具合集

Redux是一个状态管理工具，受Flxu思想启发，借鉴Elm，函数式编程

### Flux ###

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016011503.png)

  View： 视图层

  Action（动作）：视图层发出的消息（比如mouseClick）

  Dispatcher（派发器）：用来接收Actions、执行回调函数

  Store（数据层）：用来存放应用的状态，一旦发生变动，就提醒Views要更新页面

  用户访问 View

  View 发出用户的 Action

  Dispatcher 收到 Action，要求 Store 进行相应的更新

  Store 更新后，发出一个"change"事件

  View 收到"change"事件后，更新页面

### Redux ###

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)

  首先，用户发出 dispatch Action

  然后，Store自动调用Reducer，返回新的State

  State一旦有变化，Store就会调用监听函数（监听render）

  重新渲染 View

### Mobx ###

![](https://i.imgur.com/OHF9mYW.png)

本文从实用角度介绍Redux

### 安装 ###

  yarn add reduxe //redux库
  yarn add react-redux //配合redux实用

### 使用场景 ###

这里引用阮一峰老师的博客内容

  用户的使用方式复杂
  不同身份的用户有不同的使用方式（比如普通用户和管理员）
  多个用户之间可以协作
  与服务器大量交互，或者使用了WebSocket
  View要从多个来源获取数据

  具体到组件
  某个组件的状态，需要共享
  某个状态需要在任何地方都可以拿到
  一个组件需要改变全局状态
  一个组件需要改变另一个组件的状态

### 三大原则 ###

### 单一数据源 ###

一个store对象存储所有state

### state只读 ###

改变state方法只能是dispatch(action)

### 使用reducer修改state ###

Redux概念比较多，尽可能用大白话介绍

### store ###

一个对象，状态管理容器，储存网站应用所有state

    const store = createStore(reducer, [preloadedState], [enhancer])

    reducer(currentState,action):Function
    //函数返回新的state
    preloadedState:any 配合reducer使用，如果使用combineReducer，则只能是一个对象
    //初始state（服务器）覆盖reducer的初始值
    enhancer函数
    //中间件middleware时间旅行，持久化和浏览器工具
    //返回store对象

### middleware ###

中间件，改造了dispatch，增强了功能，主要用来解决异步问题（这块内容较多，后面单独介绍）

applyMiddleware(...middleware)

//middleware(getState,dispatch) 一个函数
//返回一个函数，传给下一个middleware，作为它的dispatch参数

### state ###

一个对象，跟react里的概念一样，但是需要开发者提前想好怎么组织数据结构，比如数组和对象

可以大体分为

域数据（Domain data）: 应用需要展示、使用或者修改的数据（从服务器请求的数据）
应用状态（App state）: 特定于应用某个行为的数据（正在请求当中）
UI 状态（UI state）: 控制 UI 如何展示的数据（传递给UI组件用于展示的数据）

参考
[https://github.com/paularmstrong/normalizr](https://github.com/paularmstrong/normalizr "https://github.com/paularmstrong/normalizr")

    const state = store.getState(); //取到state

更新state注意事项：

更新嵌套的对象：复制嵌套数据的所有层级

    function updateVeryNestedField(state, action) {
        return {
            ....state,
            first : {
                ...state.first,
                second : {
                    ...state.first.second,
                    [action.someId] : {
                        ...state.first.second[action.someId],
                        fourth : action.someValue
                    }
                }
            }
        }
    }

在数组中更新，插入和删除数据

//数组更新一个元素

    function updateObjectInArray(array, action) {
        return array.map( (item, index) => {
            if(index !== action.index) {
                // 这不是要修改的元素，保持原样
                return item;
            }
            // 修改的元素，返回新的数组
            return {
                ...item,
                ...action.item
            };
        });
    }

//数组插入元素

    function insertItem(array, action) {
        let newArray = array.slice();
        newArray.splice(action.index, 0, action.item);
        return newArray;
    }

//数组删除元素

    function removeItem(array, action) {
        let newArray = array.slice();
        newArray.splice(action.index, 1);
        return newArray;
    }

//数组删除元素

    function removeItem(array, action) {
        return array.filter( (item, index) => index !== action.index);
    }

相关工具

dot-prop-immutable
immutability-helper

参考

[https://github.com/markerikson/redux-ecosystem-links/blob/master/immutable-data.md#immutable-update-utilities](https://github.com/markerikson/redux-ecosystem-links/blob/master/immutable-data.md#immutable-update-utilities "https://github.com/markerikson/redux-ecosystem-links/blob/master/immutable-data.md#immutable-update-utilities")

初始化state

createStore方法中的第二个可选参数 preloadedState（优先使用）

reducer state参数指定的默认的初始值

### action ###

一个对象，用户view发出的，或者服务器相应发出的，告诉store要改变state，携带一些信息

    const actio = {type:'',payload:'',error:'',meta:''}

### action creator ###

一个函数，使用函数创建action对象，更加方便

    const type类型 = '添加 TODO';

    export function addTodo(text) {
      return {
        type: type类型,
        text
      }
    }

### action 创建 ###

把action的type存储在一个文件里面，设为常量

使用action creator 创建action对象

### action creators 生成器 ###

（redux-act 和 redux-actions）

用来生成action creator，

    function makeActionCreator(type, ...argNames) {
      return function(...args) {
        let action = { type }
        argNames.forEach((arg, index) => {
          action[argNames[index]] = args[index]
        })
        return action
      }
    }

    const ADD_TODO = 'ADD_TODO'

    export const addTodo = makeActionCreator(ADD_TODO, 'todo')

### dispatch ###

一个函数，用户view发出action的方法，也叫dispatch 一个或多个action
返回一个对象dispatch后的action

### reducer ###

一个纯函数，决定state如何改变，根据不同类型的action，返回不同的state

  纯函数：传递相同参数，产出相同结果

  不得改写参数
  不能API 请求和路由跳转
  不能调用Date.now()或者Math.random()等不纯的方法

    const reducer = (state = defaultState, action) => {
      switch(action.type){
        return new state
    }}

注意：
1、不要修改 state
数组使用array.concat或者使用扩展符
使用 Object.assign方法修改对象属性或者扩展符
2、在 default 情况下返回旧的 state

可以使用React-addons-update，updeep等冻结数据或者immutablejs

### reducer creator ###

（生成reducer函数）

    function createReducer(initialState, handlers) {
      return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
          return handlers[action.type](state, action);
        } else {
          return state;
        }
      }
    }

### combineReducers ###

一个函数，合并多个reducer，不支持Immutable的state数据结构
所做的只是生成一个函数，这个函数来调用每个reducer，根据它们的 键值来调用不同reducer计算state，然后把结果合并成一个大的state对象。

    const rootReducer=combineReducers({reducer1，reducer2，reducer3...})

combineReducers重命名reducer

    import defaultState, {firstNamedReducer, secondNamedReducer as secondState} from "./reducers";

    const rootReducer = combineReducers({
        defaultState,                   // key 的名称和 default export 的名称一样
        firstState : firstNamedReducer, // key 的名字是单独取的，而不是变量的名字
        secondState,                    // key 的名称和已经被重命名过的 export 的名称一样
    });

分拆reducer

分类

reducer: 普通reducer，根据state，action，返回新的action

root reducer: 根reducer，普通reducer合并而成

slice reducer: 处理state对象的reducer

case function: 处理action相关内容，传入多个参数

higher-order reducer: reducer函数作为它的参数，返回新的reducer

可重用的工具函数

处理特殊state属性的回调函数

处理某个state属性的reducer函数

处理switch case的函数

合并case reducer的函数

形成根reducer

### Reducer 逻辑复用 ###

    //通用reducer
    function counter(state = 0, action) {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1;
            case 'DECREMENT':
                return state - 1;
            default:
                return state;
        }
    }
    //创建不同reducer，复用通用的reducer
    function createNamedWrapperReducer(reducerFunction, reducerName) {
        return (state, action) => {
            const {name} = action;
            const isInitializationCall = state === undefined;
            if(name !== reducerName && !isInitializationCall) return state;
            return reducerFunction(state, action);
        }
    }
    //组合不同的reducer
    const rootReducer = combineReducers({
        counterA : createNamedWrapperReducer(counter, 'A'),
        counterB : createNamedWrapperReducer(counter, 'B'),
        counterC : createNamedWrapperReducer(counter, 'C'),
    });


### subscribe ###

一个函数，监听state变化，重新渲染页面

    let unsubscribe=store.subscribe(render);

### unsubscribe ###

一个函数，subscribe的回调函数，解除监听

    unsubscribe()

### bindActionCreators(actionCreators, dispatch) ###

actionCreators 一个函数或者对象
dispatch 一个函数
返回值为一个函数或者一个对象，取决于actionCreators

### compose(...functions) ###

使用多个中间件

执行顺序从右到左

    import { createStore, applyMiddleware, compose } from 'redux'
    import thunk from 'redux-thunk'
    import DevTools from './containers/DevTools'
    import reducer from '../reducers'
    const store = createStore(
      reducer,
      compose(
        applyMiddleware(thunk),
        DevTools.instrument()
      )
    )

React-Redux

### Provider组件 ###

使组件connect() 方法都能够获得Redux中的store对象

### 属性 ###

store: 传入store对象

children 根组件

### connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options]) ###

把UI组件转为容器组件，与Redux store连接

不会改变原来的组件，返回一个容器组件与Redux store连接

### [mapStateToProps(state, [ownProps])] ###

如果不使用，null，undefined，UI 组件就不会订阅Store，Store 的更新不会引起 UI 组件的更新

功能：从redux store里边取state值

一个函数，返回一个对象stateProps，监听store变化，返回一个对象，变为props的属性，这样就可以取到了

### state ###

Redux store的state对象，react-redux自动调用store.getState()得到state对象

### ownProps ###
容器组件的props，容器组件只要接收新的props，mapStateToProps都会调用

    function mapStateToProps(state,props) {
        return {
            userinfo: state.userinfo
        }
    }

### [mapDispatchToProps] ###

功能：改变redux的state对象的值

一个函数或者一个对象

### 作为函数 ###

[mapDispatchToProps(dispatch, [ownProps])]

返回一个对象dispatchProps，这个对象通过redux的bindActionCreators方法把action creator与dispatch绑定在一起，组件通过props调用对象的方法，修改redux state，自动调用dispatch，也就是添加了dispatch功能

    const mapDispatchToProps=(dispatch,ownProps)=> {
        return {
            funcName: bindActionCreators(actionCreator, dispatch)
        }
    }
    //funcName这个要传给props，this.props.funcName
    //bindActionCreators redux的方法
    //actionCreator
    //funcName与actionCreator是映射关系

dispatch
react-redux方法

ownProps
容器组件的props，容器组件只要接收新的props，mapStateToProps都会调用

### 作为对象 ###

每个对象的键值（函数体）就是action creator，dispatch自动绑定action creator
键名传递给props，this.props.funcName

    const mapDispatchToProps={
        funcName:actionCreator
    }
    //funcName 传递给props
    //actionCreator

### [mergeProps(stateProps, dispatchProps, ownProps)]（少用） ###

一个函数，返回props对象作为UI组件的props

场景：
根据props分割state对象
把action creator绑定到props的一个变量中

[options]（少用）

一个对象，修改connect的默认方法

[pure] (Boolean): 为真，如果state和props相同，避免重新渲染
默认：true

[areStatesEqual] (Function):
比较前后state
默认：===

[areOwnPropsEqual] (Function):
比较前后props
默认：比较值相等，或者对象含有相同的键，其属性值相等

[areStatePropsEqual] (Function):
比较mapStateToProps前后结果
默认：比较值相等，或者对象含有相同的键，其属性值相等

[areMergedPropsEqual] (Function):
比较mergeProps
默认：比较值相等，或者对象含有相同的键，其属性值相等

[storeKey] (String):
从哪里读取store
多个store使

官网这里介绍的比较详细，大家参考一下，一般不用设置可以达到99%的效果


### connectAdvanced(selectorFactory, [connectOptions])（少用） ###

精简版connect方法

### createProvider([storeKey])（少用） ###

创建Provider，多个store使用

### 异步action ###

一个异步请求都需要 dispatch 至少三种 action

一种通知 reducer 请求开始的 action
一种通知 reducer 请求成功的 action
一种通知 reducer 请求失败的 action

两种action表示

    { type: 'FETCH_POSTS' }
    { type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
    { type: 'FETCH_POSTS', status: 'success', response: { ... } }

    { type: 'FETCH_POSTS_REQUEST' }
    { type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
    { type: 'FETCH_POSTS_SUCCESS', response: { ... } }

把请求数据dispatch action和特定的UI dispatch action分开

### 异步action creator ###

同步action creator，返回action对象

异步action creator（thunk），返回一个函数，这个函数在中间件执行，发出异步请求，dispatch action

返回的函数的参数是dispatch和getState，使用redux-thunk中间件改造dispatch方法，使它可以接收函数为参数

    export function fetchPosts(subreddit) {
      return function (dispatch) {
        // 传递dispatch 用来 dispatch action
        dispatch(requestPosts(subreddit))
        // 首次 dispatch action：通知state，发起通知
        return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
          .then(
            response => response.json(),
             error => console.log('An error occurred.', error)
            // 不要使用 catch，会报错
          )
          .then(json =>
            dispatch(receivePosts(subreddit, json))
            // 可以多次 dispatch！
            // dispatch action更新state
          )
      }
    }

    const store = createStore(reducer, [preloadedState], [enhancer])

enhancer/middleware

改造原生store.dispatch方法，添加一些其他功能，但是最后必须返回一个action对象，可以传入多个middleware，有顺序，参考中间件的文档

cross_fetch //发送请求

redux-thunk

redux-promise

redux-promise-middleware

redux-observable

redux-saga

redux-pack

网上中间件比价多，大家按需学习

### 后退和前进 ###

后退和前进修改state

redux-undo

### 计算衍生数据 ###

reselect



### Redux相关工具

normalizr //state扁平数据结构

redux-act //创建action creatror

redux-actions //创建action creatror

cross_fetch //发送请求

redux-thunk //中间件

redux-promise //dispatch promise

redux-promise-middleware //dispatch promise

redux-observable //dispatch observable

redux-saga //创建复杂action

redux-pack //dispatch promise

redux-undo //后退和前进state

reselect //计算衍生数据

redux-immutable //

reduce-reducers不同 reducers 之间共享数据

dot-prop-immutable

object-path-immutable

Redux-ORM

dot-prop-immutable

immutability-helper

redux-ui

redux-component

redux-react-local

redux-watch

redux-subscribe

Redux Loop

redux-ignore

reduxr-scoped-reducer

redux-log-slow-reducers

redux-batched-subscribe（一个高级的reducer，可以让你单独分发几个action）

redux-batched-subscribe（一个store增强器，可以平衡多个分发情况下订阅者的调用次数）

redux-batched-actions（一个store增强器，可以利用单个订阅提醒的方式分发一系列的 action）