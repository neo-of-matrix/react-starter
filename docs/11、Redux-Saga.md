### 11、Redux-Saga ###

一个用于管理 Redux 应用异步操作的中间件

Sagas 是通过 Generator 函数来创建的，可以先学习一下Generator

所有的任务都通用 yield Effects 来完成
Effects 一个对象，类似于action对象，包含异步请求数据

### 安装 ###

yarn add redux-saga

### 核心实现 ###

以generator形式组织逻辑序列（function + yield），把一系列的串行/并行操作通过yield拆分开

利用iterator的可“暂停/恢复”特性（iter.next()）分步执行

通过iterator影响内部状态（iter.next(result)），注入异步操作结果

利用iterator的错误捕获特性（iter.throw(error)），注入异步操作异常

### 关键概念 ###

### Effect ###

Effect指的是描述对象，相当于Action，redux-saga中间件可识别的操作指令，例如调用指定的业务方法（call(myFn)）、dispatch指定action（put(action)）

Effect层存在的主要意义是为了易测试性

action描述消息（发生了什么），而redux-saga用Effect描述操作指令（要做什么）

### Effect creator ###

相当于Action Creator

redux-saga/effects提供了很多用来生成Effect的工具方法。常用的Effect creator如下：

### 阻塞型方法调用：call/apply ###

### 非阻塞型方法调用：fork/spawn ###

通过spawn执行的task完全独立，与当前saga无关

当前saga不管它执行完了没，发生cancel/error也不会影响当前saga

效果相当于让指定task独立在顶层执行，与middleware.run(rootSaga)类似

通过fork执行的task与当前saga有关

fork所在的saga会等待forked task，只有在所有forked task都执行结束后，当前saga才会结束

fork的执行机制与all完全一致，包括cancel和error的传递方式，所以如果任一task有未捕获的error，当前saga也会结束

### 并行执行task：all/race ###

### 读写state：select/put ###

### task控制：join/cancel/cancelled ###

join用来获取非阻塞的task的返回结果

cancel机制

对于执行中的task序列，所有task自然完成时，把结果向上传递到队首，作为上层某个yield的返回值

如果task序列在处理过程中被cancel掉了，会把cancel信号向下传递，取消执行所有pending task

还会把cancel信号沿着join链向上传递，取消执行所有依赖该task的task

complete信号沿调用链反向传递

而cancel信号沿task链正向传递，沿join链反向传递

注意：yield cancel(task)也是非阻塞的（与fork类似），而被cancel掉的任务在完成善后逻辑后会立即返回

### Saga ###

redux-saga里的Saga形式上是generator，用来描述一组操作

Saga就是generator，Sagas就是多个generator

Sagas有2种顺序组合方式：

yield* saga()

call(saga)

### Saga Helpers ###

Saga Helper用来监听action变，API形式是takeXXX

take：语义相当于once

takeEvery：语义相当于on，允许并发action（上一个没完成也立即开始下一个）

takeLatest：限制版的on，不允许并发action（pending时又来一个就cancel掉pending的，只做最新的）

takeEvery, takeLatest是在take之上的封装，take才是底层API，灵活性最大，能手动满足各种场景pull action与push action

从控制方式上讲，take是pull的方式，takeEvery, takeLatest是push的方式

pull与push是指：

pull action：要求业务方主动去取action（yeild take()会返回action）

push action：由框架从外部注入action（takeEvery/takeLatest注册的Saga会被注入action参数）

pull方式的优势在于：

允许更精细的控制

比如可以手动实现takeN的效果（只关注某几次action，用完就释放掉）

以同步形式描述控制流

takeEvery, takeLatest只支持单action，如果是action序列的话要拆开，用take能保留关联逻辑块的完整性，比如登录/注销

### 使用 ###

### createSagaMiddleware(options) ###

//连接redux-saga和redux store

options:Object

sagaMonitor:SagaMonitor

//传递监听事件到监听器

emitter:function

//向redux-saga注入action

//高阶函数

logger(level,...args):function

//定义打印错误和警告信息，默认全部打印

//level:info warning error

onError:function

//如果报错，执行这个函数

### middleware.run(saga, ...args) ###

saga:function

//一个generator函数，在applyMiddleware之后使用

//返回generator对象，依次执行yield effects，直到正常结束或者抛出错误，执行过程跟generator函数一样

args：数组，saga的参数

返回值：task descriptor

    task.isRunning()
    //true任务是否正在执行
    task.isCancelled()
    //true任务是否取消
    task.result()
    //返回结果，如果任务一直执行，返回undefined
    task.error()
    //任务抛出错误，如果任务一直执行，返回undefined
    task.done
    //返回一个Promise，两种情况resolved执行成功  rejected执行出现错误
    task.cancel()
    //取消任务（如果任务一直在执行）

Saga 辅助工具函数（辅助生成effects）

### takeEvery(pattern, saga, ...args) ###
### takeEvery(channel, saga, ...args) ###

//dispatch action（匹配pattern）到store的时候，开始生成effect

//是由底层take和fork实现的

//saga任务会依次执行，无论上个任务是否执行完

pattern: String | Array | Function

saga: Generator Function

args: Array<any>

//这些参数传给开始任务，saga的参数

### takeLatest(pattern, saga, ...args) ###

### takeLatest(channel, saga, ...args) ###

//类似takeEvery，区别saga任务依次执行，下次任务执行之前，取消之前没有执行完的任务

pattern: String | Array | Function

saga: Function - a Generator function

args: Array<any>

### 创建 Effects ###

### call(fn, ...args) ###

### call([context, fn], ...args) ###

### call([context, fnName], ...args) ###

//fn:function普通函数或者generator函数，自动检测

返回值

Iterator object对象

执行generator函数，子generator执行完或者出现错误，父generator才执行

Promise对象

resolved rejected promise

既不是Iterator object对象也不是Promise对象，立即返回值传给saga

//args:fn的参数

//context传递this

### dispatch action ###

### put(action) ###

//创建effect通知中间件dispatch action到store

//非阻塞，下个流的错误不会冒泡到saga

//action:object