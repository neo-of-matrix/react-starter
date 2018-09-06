# dva #
### 1、介绍 ###

基于 redux、redux-saga 和 react-router 的轻量级前端框架

### 2、使用 ###

    $ npm install dva-cli -g (0.92)

    $ dva new dva-quickstart

    $ cd dva-quickstart

    $ npm install antd babel-plugin-import --save（配合antd使用）

    .webpackrc

    {
      "extraBabelPlugins": [
    	["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
      ]
    }

    $ npm start

### 3、定义models ###
	
    export default {
		// 命名空间
      namespace: 'products',
    	// 当前命名空间数据
      state: 0,
    	// reducers 同步改变数据方法
      reducers: {
    	add(state, { payload参数过渡属性: id }（参数）) {
      	return state + id
    	},
    	minus(state, { payload参数过渡属性: id }（参数）) {
      	return state - id
    	}
      },
		// effects 异步发送请求数据后改变数据
      effects:{
    	*addAfter1Second({payload参数过渡属性:id}（参数）, { put, call }（方法）) {
      		yield call(asyn（异步请求）,3000（异步请求参数）); // call调用异步方法
      		yield put({ // put相当于dispatch
    		type:'add',
    		payload:id
      });
    	}
      }
    }

### 4、读取state ###


	使用connect方法进行连接，
    import { connect } from 'dva';
    
    function mapStateToProps(state) {
      return { todos（自定义属性名）: state.todos（从redux里面取来的数据） };
    }
    connect(mapStateToProps)(App);

	this.props.todos进行调用

### 5、修改state ###

使用connect方法自动带入dispatch（同步、异步）方法

    this.props.dispatch({
    	type:'命名空间/reducer、effects',
    	payload（参数过渡属性）:id（参数）
    })

### 6、图解 ###

![](https://i.imgur.com/WJA7wuT.png)