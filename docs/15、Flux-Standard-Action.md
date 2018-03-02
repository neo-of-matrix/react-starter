### 15、Flux-Standard-Action ###

规范action对象

1. 必须是一个普通JavaScript对象
1. 必须有type属性
1. 可能有error属性
1. 可能有payload属性 
1. 可能有meta属性

type

action 字符串类型

payload

可以是任何类型，除了type类型和action的status

如果error属性为真，payload应该是一个错误类型，和reject的promise错误对象类似

error

可以是true，undefined， null

meta

可以是任何类型，代表除了payload以外的信息

### 工具函数 ###

### isFSA(action) ###

判断action是否符合FSA对象规则

import { isFSA } from 'flux-standard-action';

### isError(action) ###

判断action是否代表错误

import { isError } from 'flux-standard-action';