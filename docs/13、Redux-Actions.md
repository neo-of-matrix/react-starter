### 13、Redux-Actions ###

Redux-Actions是一个优化Redux结构的工具库，Redux有action, action creator, reducer等有许多相同的代码

遵循flux-standard-action规范

### 安装 ###

	yarn add redux-actions

### 使用 ###

### createAction ###

优化action和action creator

	const incrementCounter = createAction('COUNTER_INCREMENT');

- createAction(type)

返回一个action creator函数

- createAction(type, payloadCreator)

payloadCreator必须是一个函数，undefined，null
如果是undefined，null等同于createAction(type)

- createAction(type, payloadCreator, metaCreator)

metaCreator可选函数

1. 创建meta数据
1. 接收payloadCreator相同参数
1. 如果是undefined或者不是函数，meta会被忽略

### createActions ###

	const {counterIncrement,counterDecrement}=createActions({
		COUNTER_INCREMENT:amount => ({ amount: 1 }),
		COUNTER_DECREMENT:amount => ({ amount: -1 })
	})

createActions(actionMap)

actionMap可选对象

keys对应action types

values 必须是

1. 一个函数（payload creator）
1. 一个数组[payload function, meta function]
1. 一个actionMap

### handleAction ###

优化reducer

handleAction(type, reducer, defaultState)

单个reducer

	handleAction('APP/COUNTER/INCREMENT', (state, action) => ({
	  counter: state.counter + action.payload.amount,
	}), defaultState);

handleAction(type, reducerMap, defaultState)

	handleAction('FETCH_DATA', {
	  next(state, action) {...},
	  throw(state, action) {...},
	}, defaultState);

### handleActions ###

多个reducer

handleActions(reducerMap, defaultState)

reducerMap对象

	{
	  INCREMENT: (state, action) => ({
	    counter: state.counter + action.payload
	  }),
	
	  DECREMENT: (state, action) => ({
	    counter: state.counter - action.payload
	  })
	}

defaultState默认state

### combineActions ###

组合action types或者action creators

- combineActions(...types)

多个action使用同一个reducer

	const reducer = handleAction(combineActions(increment, decrement), {
	  next: (state, { payload: { amount } }) => ({ ...state, counter: state.counter + amount }),
	  throw: state => ({ ...state, counter: 0 }),
	}, { counter: 10 })

	const reducer = handleActions({
	  [combineActions(increment, decrement)](state, { payload: { amount } }) {
	    return { ...state, counter: state.counter + amount };
	  }
	}, { counter: 10 });