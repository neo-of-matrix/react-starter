### 8、React ###
这里不详细介绍react用法，只是罗列一些知识点
一个用于构建用户界面的 JavaScript 库
声明式 组件化

    yarn add react --dev //react基础包
    yarn add react-dom --dev //提供针对DOM的方法
    yarn add react-hot-loader --dev //react热更新loader配合webpack使用

### JSX语法 ###

HTML和JavaScript结合的语法
内部可以使用表达式
JSX 本身其实也是一种表达式
可以嵌套
默认是防注入攻击

### 组件 ###

接收任意的输入值（props），并返回React元素
组件名称必须以大写字母开头

### 函数组件 ###

    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }

### 类组件 ###

    class Welcome extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }

props属性 通过props组件间传递内容
state对象，类内部使用，无法传给其他组件，只能通过props
两者都可以更新UI页面

constructor(props){
    super(props) //接收父组件传递的内容，使用this.props.
    this.state={}
}
这是ES6写法，具体内容参看ES6相关内容

生命周期函数

装配
这些方法会在组件实例被创建和插入DOM中时被调用：

constructor(props) //接收props，定义state，方法绑定this
componentWillMount()
render() //渲染页面
componentDidMount() //render之后，请求数据，改变state

更新
属性或状态的改变会触发一次更新。当一个组件在被重渲时，这些方法将会被调用：

componentWillReceiveProps(nextProps)
shouldComponentUpdate(nextProps, nextState) //决定组件是否重新渲染，React.PureComponent
componentWillUpdate(nextProps, nextState)
render()
componentDidUpdate(prevProps, prevState)

卸载
当一个组件被从DOM中移除时，该方法被调用：

componentWillUnmount() //清除定时器，取消网络请求，清理在componentDidMount环节创建的DOM元素

其他API
每一个组件还提供了其他的API：

setState(updater, [callback])
异步更新state，不能立即使用this.state
updater 重新渲染后执行
(prevState, props) => stateChange
多个state会合并

forceUpdate()

类属性

defaultProps //类的默认属性
displayName //用于调试

实例属性

props //不要修改Props，可以传递基本数据类型、React 元素或函数
state

### 组合组件（用一个&lt;div&gt;来包裹） ###
### 切分组件 ###

### 状态共享 ###

两个组件通过它们的父组件进行通信
子组件通过父组件通过props传递的回调函数来修改父组件的状态
复杂情况使用第三方状态管理工具进行通信

### 事件 ###

驼峰式写法
绑定this

### 参数传递 ###
箭头函数事件对象必须显式的进行传递

### 条件渲染 ###
if 运算符 阻止组件渲染（return null）

### 列表 ###
可以使用map函数渲染多个组件，添加key属性
key应该在数组的上下文中被指定

### 表单 ###
受控组件
输入框的值从this.state.value获取
通过onChange={this.方法}，在方法里改变state，格式化用户输入的文本
select标签在
在根select标签上设置this.state.value
多个输入框
根据name属性和函数内调用event.target.name

### 使用 prop-types/flow/typeScript 库进行数据类型检查 ###

### Portals ###
将子节点渲染到父组件以外的 DOM 节点
ReactDOM.createPortal(child, container)

### 高阶组件（HOC） ###
高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件
解决相同模式代码的问题

### 为事件处理程序或回调函数传递参数 ###
通过箭头函数传递参数

    this.handleClick = this.handleClick.bind(this);
    onClick={() => this.handleClick(letter)}
    handleClick(letter) {
        this.setState({ justClicked: letter });
      }

通过data-属性传递参数，配合React.PureComponent使用

    this.handleClick = this.handleClick.bind(this);
    <li key={letter} data-letter={letter} onClick={this.handleClick}>
        {letter}
    </li>
  handleClick(e) {
    this.setState({
      justClicked: e.target.dataset.letter
    });
  }
### 避免函数被调用太快 ###

throttling（函数节流）: 基于时间的频率来进行更改 (例如 _.throttle)
lodash.throttle

    import throttle from 'lodash.throttle';
    class LoadMoreButton extends React.Component {
      constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickThrottled = throttle(this.handleClick, 1000);
      }
      componentWillUnmount() {
        this.handleClickThrottled.cancel();
      }
      render() {
        return <button onClick={this.handleClickThrottled}>Load More</button>;
      }
      handleClick() {
        this.props.loadMore();
      }
    }

debouncing（函数防抖）: 函数上次执行后的一段时间内，不会再次执行 (例如 _.debounce)lodash.debounce

    import debounce from 'lodash.debounce';
    class Searchbox extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.emitChangeDebounced = debounce(this.emitChange, 250);
      }
      componentWillUnmount() {
        this.emitChangeDebounced.cancel();
      }
      render() {
        return (
          <input
            type="text"
            onChange={this.handleChange}
            placeholder="Search..."
            defaultValue={this.props.value}
          />
        );
      }
      handleChange(e) {
        // React pools events, so we read the value before debounce.
        // Alternately we could call `event.persist()` and pass the entire event.
        // For more info see reactjs.org/docs/events.html#event-pooling
        this.emitChangeDebounced(e.target.value);
      }
      emitChange(value) {
        this.props.onChange(value);
      }
    }

requestAnimationFrame:基于requestAnimationFrame来进行更改 (例如 raf-schd)

    import rafSchedule from 'raf-schd';
    class ScrollListener extends React.Component {
      constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.scheduleUpdate = rafSchedule(
          point => this.props.onScroll(point)
        );
      }
      handleScroll(e) {
        // 只能接收最后一帧
        this.scheduleUpdate({ x: e.clientX, y: e.clientY });
      }
      componentWillUnmount() {
        this.scheduleUpdate.cancel();
      }
      render() {
        return (
          <div
            style={{ overflow: 'scroll' }}
            onScroll={this.handleScroll}
          >
            <img src="/my-huge-image.jpg" />
          </div>
        );
      }
    }

### 与第三方库协同 ###
与 DOM 节点操作类插件结合

通过ref属性获取节点
componentDidMout(监听react方法)
componentDidUpdate(触发JQuery的函数)
componentWillUnmount(取消监听，删除监听器)

在 React 中使用其他引擎加载页面（字符串模板）
把字符串模板封装成一个组件
调用ReactDOM.render(字符串组件,节点，相关逻辑处理)

### 性能优化 ###

项目地址栏内添加查询字符串 ?react_perf进行性能检测

React.PureComponent
通过shouldComponentUpdate（nextProps, nextState）比较this.props.属性===nextProps.属性和this.state.状态===nextState.状态决定是否重新渲染
在更新数组和对象等数据结构数据时会有问题

数组添加元素

错误

    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});

改为

    this.setState(prevState => ({
        words: prevState.words.concat(['marklar'])
      }));

或者

    this.setState(prevState => ({
        words: [...prevState.words, 'marklar'],
      }));

数组删除元素

    const words = this.state.words;
    words.splice(index,1);
    this.setState({words: words});

改为

    this.setState(prevState => ({
        words: prevState.words.slice(0,index)
                              .concat(prevState.words.slice(index+1))
      }));

或者

    this.setState(prevState => ({
        words: [
                ...prevState.words.slice(0,index),
                ...prevState.words.slice(index+1)]
      }));

数组替换元素

错误

    const incrementCounter=(list,index)=>{
      list[index]++;
      return list;
    }

改为

    const incrementCounter=(list,index)=>{
      return list
        .slice(0,index)
        .concat([list[index]+1])
        .concat(list.slice(index+1))
    }

或者

    const incrementCounter=(list,index)=>{
      return
        [
          ...list.slice(0,index),
          list[index]+1,
          ...list.slice(index+1)
        ]
    }

修改对象属性

错误

    function updateColorMap(colormap) {
      colormap.right = 'blue';
    }

改为

    function updateColorMap(colormap) {
      return Object.assign({}, colormap, {right: 'blue'});
    }

或者

    function updateColorMap(colormap) {
      return {...colormap, right: 'blue'};
    }

使用不可变的数据结构

Immutable.js/seamless-immutable/immutability-helper

### React动画库 ###

React Transition Group
React Motion
React animation
velocity-react
GSAP