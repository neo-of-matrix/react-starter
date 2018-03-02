### 14、Ducks-Modular-Redux ###

把actionTypes, actions, action creator, reducer放在一个独立的文件中

### 规则 ###

export default 必须导出reducer

必须导出action creator函数

actionTypes必须定义为npm-module-or-app/reducer/ACTION_TYPE类似形式的字符串

外部使用actionTypes时，可以导出ACTION_TYPE类似形式

### 示例 ###

	// widgets.js
	
	// Actions
	const LOAD   = 'my-app/widgets/LOAD';
	const CREATE = 'my-app/widgets/CREATE';
	const UPDATE = 'my-app/widgets/UPDATE';
	const REMOVE = 'my-app/widgets/REMOVE';
	
	// Reducer
	export default function reducer(state = {}, action = {}) {
	  switch (action.type) {
	    // do reducer stuff
	    default: return state;
	  }
	}
	
	// Action Creators
	export function loadWidgets() {
	  return { type: LOAD };
	}
	
	export function createWidget(widget) {
	  return { type: CREATE, widget };
	}
	
	export function updateWidget(widget) {
	  return { type: UPDATE, widget };
	}
	
	export function removeWidget(widget) {
	  return { type: REMOVE, widget };
	}

### 使用 ###

	import { combineReducers } from 'redux';
	import * as reducers from './ducks/index';
	
	const rootReducer = combineReducers(reducers);
	export default rootReducer;

	import * as widgetActions from './ducks/widgets';