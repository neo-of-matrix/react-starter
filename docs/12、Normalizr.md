### 12、normalizr ###

一个格式化state结构的库，从后台请求的数据大部分是JSON格式，嵌套结构比较多，使用数据很不方便。

normalizr借鉴了数据库相关知识，定义schema，返回带有ID的嵌套entities

### 安装 ###

    yarn add normalizr

### 使用 ###

### normalize(data, schema) ###

//data

原始数据，即要转换的state数据

//schema集合

定义schema集合，如何转换

    import { normalize, schema } from 'normalizr';
    const myData = { users: [ { id: 1 }, { id: 2 } ] };
    const user = new schema.Entity('users');
    const mySchema = { users: [ user ] };
    const normalizedData = normalize(myData, mySchema);

### new schema ###

new schema的方法

### Array(definition, schemaAttribute) ###

//格式化array entities实体

//如果是对象，格式化后的结果是一个数组，每一项是对象的属性

//简写[arrayEntities]

参数

//definition(必须)

单个Entities实体，将要包含数组schema集合

    const data = [ { id: '123', name: 'Jim' }, { id: '456', name: 'Jane' } ];
    const userSchema = new schema.Entity('users');
    const userListSchema = new schema.Array(userSchema);
    //或者
    const userListSchema = [ userSchema ];
    const normalizedData = normalize(data, userListSchema);

//schemaAttribute

多个Entities实体，那么启用这个规则

每一个entities实体，都会执行这个规则

字符串或者函数

函数参数(value,parent,key)

value 每一个entity实体

parent entity实体数组父级

key 每一个数组元素出现在父级上的key

    const data = [ { id: 1, type: 'admin' }, { id: 2, type: 'user' } ];
    const userSchema = new schema.Entity('users');
    const adminSchema = new schema.Entity('admins');
    const myArray = new schema.Array({
      admins: adminSchema,
      users: userSchema
    }, (input, parent, key) => `${input.type}s`);
    const normalizedData = normalize(data, myArray);

### Entity(key, definition = {}, options = {}) ###

//key(必须)

所有实体的key值

//definition

嵌套实体定义规则

//options

idAttribute

每一个实体类型独特ID的属性

字符串或者函数

函数(value,parent,key)

//value 输入数组
//parent 输入数组父级对象
//输入数组出现在父级对象上的key值

mergeStrategy(entityA, entityB)

合并两个实体，但是ID相同，定义的规则

默认把最近的实体映射到之前的实体

processStrategy(value, parent, key)

预处理实体

增加额外数据，增加或者改变实体

默认返回一个输入实体的拷贝

//value 输入数组

//parent 输入数组父级对象

//输入数组出现在父级对象上的key值

    const data = { id_str: '123', url: 'https://twitter.com', user: { id_str: '456', name: 'Jimmy' } };
    const user = new schema.Entity('users', {}, { idAttribute: 'id_str' });
    const tweet = new schema.Entity('tweets', { user: user }, {
        idAttribute: 'id_str',
        // Apply everything from entityB over entityA, except for "favorites"
        mergeStrategy: (entityA, entityB) => ({
          ...entityA,
          ...entityB,
          favorites: entityA.favorites
        }),
        // Remove the URL field from the entity
        processStrategy: (entity) => omit(entity, 'url')
    });
    const normalizedData = normalize(data, tweet);

### Object(definition) ###

//格式化对象Emtities

//简写{objectEmtities}

//definition (必须) 嵌套entities使用

    const data = { users: [ { id: '123', name: 'Beth' } ] };
    const user = new schema.Entity('users');
    const responseSchema = new schema.Object({ users: new schema.Array(user) });
    //或者
    const responseSchema = { users: new schema.Array(user) };
    const normalizedData = normalize(data, responseSchema);

### Union(definition, schemaAttribute) ###

//组合schema集合

//definition 嵌套Emtities使用

//schemaAttribute每一个entity的属性值

//字符串或者函数

函数(value,parent,key)

    const data = { owner: { id: 1, type: 'user', name: 'Anne' } };
    const user = new schema.Entity('users');
    const group = new schema.Entity('groups');
    const unionSchema = new schema.Union({
      user: user,
      group: group
    }, 'type');
    const normalizedData = normalize(data, { owner: unionSchema });

### Values(definition, schemaAttribute) ###

//描述一个map,由schema给定

//definition（必须）单一结构schema

//schemaAttribute definition不是单一结构schema使用

//字符串或函数

函数(value,parent,key)

    const data = { firstThing: { id: 1 }, secondThing: { id: 2 } };
    const item = new schema.Entity('items');
    const valuesSchema = new schema.Values(item);
    const normalizedData = normalize(data, valuesSchema);

### denormalize(input, schema, entities) ###
