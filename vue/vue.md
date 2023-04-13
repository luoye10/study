# 双向绑定

## 含义

把`Model`绑定到`View`，更新`Model`时，`View`会自动更新，更新`View`，`Model`也会自动更新

## 原理

`ViewModel`负责将数据于视图关联起来，数据变化后更新视图，视图变化后更新数据

## 实现

对数据对象进行遍历，利用 `Object.defineProperty()` 为属性添加 `setter` 和 `getter`，实时监听数据的变化

# SPA(Single Page Application)

一种网络应用程序或网站的模型，它通过动态重写当前页面来与用户交互

### 优点

-   用户体验好，内容的改变不需要重新加载整个页面
-   良好的前后端分离，架构清晰
-   服务器的压力小

### 缺点

-   首次渲染速度较慢
-   不利于搜索引擎的抓取
-   SEO 难度较大

## SPA 和 MPA 的区别

    单页面应用(SPA)          |       多页面应用(MPA)

-   组成 一个主页面和多个页面片段 | 多个主页面

-   刷新方式 局部刷新 | 整页刷新

-   url 模式 hash 模式 | history 模式

-   SEO 搜索引擎优化 难实现，可用 SSR 方式改善 | 容易实现

-   数据传递 容易 | 通过 url、cookie、localStorage 等传递

-   页面切换 速度快，用户体验良好 | 切换加载资源，速度慢，用户体验差

-   维护成本 相对容易 | 相对复杂

## 首屏加载速度慢

### 原因

-   网络延时问题
-   资源文件体积是否过大
-   资源是否重复发送请求去加载了
-   加载脚本的时候，渲染内容堵塞了

### 解决方案

#### 减小入口文件体积

路由懒加载，以函数的形式加载路由，把不同路由对应的组件分割成不同的代码块，把各自的路由文件分别打包，  
只有在解析给定的路由时，才会加载路由组件，使得入口文件变小，加载速度大大增加

#### 静态资源本地缓存

后端

-   采用 `HTTP` 缓存，设置 `Cache-Control`，`Last-Modified`，`Etag` 等响应头

-   采用 `Service Worker` 离线缓存

前端合理利用 `localStorage`

#### UI 框架按需加载

#### 组件重复打包

#### 图片资源的压缩

对页面上使用到的 `icon`，可以使用在线字体图标，雪碧图，将众多小图标合并到一张图上，减轻 `http` 请求压力

#### 使用 SSR(Server side Rendering)

也就是服务端渲染，组件或页面通过服务器生成 `html` 字符串，再发送到浏览器

# data 属性

## 实例和组件定义 data 的区别

`vue` 实例定义的 `data` 属性可以是对象，也可以是函数

组件中定义的 `data` 属性只能是函数

## 组件 data 定义函数和对象的区别

函数形式返回一个 `data` ，每个实例对象的数据不会受到其他实例对象数据的污染

对象形式返回一个 `data`，会相互影响，产生数据污染

## 结论

-   根实例对象的 `data` 可以是对象，也可以是函数，不会产生数据污染
-   组件实例对象的 `data` 必须是函数，是为了防止多个实例对象共用一个 `data`，产生数据污染

# 给对象添加新属性，界面不刷新

## 原因

`vue2` 是通过 `Object.defineProperty()` 实现数据响应式，当为 `obj` 添加新属性时，  
没有通过 `Object.defineProperty()` 设置成响应式数据，无法进行拦截

## 解决方案

### vue.set()

#### 参数

-   {Object | Array} target
-   {string | bunber} propertyName/index
-   {any} value

通过 `Vue.set()` 添加一个`property`，确保这个新 `property` 同样是响应式的，且触发视图更新

### Object.assign()

创建一个新对象，合并原对象和要添加的新属性

```js
let obj = Object.assign({},obj,{newProperty1:1 ...})
```

### 小结

-   如果为对象添加少量的新属性，用 `vue.set()`
-   如果要为对象添加大量的新属性，用 `Object.assign()` 创建新对象

# 组件通信

## props 传递数据

父组件传递数据给子组件

-   子组件设置 props 属性，定义接收父组件传递过来的参数
-   父组件在使用子组件标签中通过字面量来传递值
    `Children.vue` 组件

```js
props:{
    name: String,
    age: {
        type: Number,
        default:18,
        require:true
    }
}
```

`Father.vue` 组件

```html
<Children name="jack" age="18" />
```

## \$emit 触发自定义事件

子组件传递数据给父组件

-   子组件通过 `$emit` 触发自定义事件，`$emit` 第二个参数为传递的数值
-   父组件绑定监听器获取到子组件传递过来的参数
    `Children.vue` 组件

```js
this.$emit('add', good);
```

`Father.vue` 组件

```html
<Children @add="cartAdd($event)" />
```

## ref

-   父组件在使用子组件的时候设置 `ref`
-   父组件通过设置子组件 `ref` 来获取数据

父组件

```
<Children ref="foo" />

this.$refs.foo  // 获取子组件实例，通过子组件实例我们就能拿到对应的数据
```

## parent 或 root

-   通过共同祖辈 `$parent`或者 `$root` 搭建通信桥梁

兄弟组件

```js
this.$parent.on('add', this.add);
```

另一个兄弟组件

```js
this.$parent.emit('add');
```

## attrs 与 listeners

祖先传递数据给子孙

-   设置批量向下传属性 `$attrs` 和 `$listeners`
-   包含了父级作用域中不作为 `prop` 被识别 (且获取) 的特性绑定 ( class 和 style 除外)。
-   可以通过 `v-bind="$attrs"` 传⼊内部组件

```html
// parent
<HelloWorld foo="foo" />

// child：并未在props中声明foo
<p>{{$attrs.foo}}</p>
```

```html
// 给Grandson隔代传值
<Child msg="lalala" @some-event="onSomeEvent"></Child>

// Child做展开
<Grandson v-bind="$attrs" v-on="$listeners"></Grandson>

// Grandson使⽤
<div @click="$emit('some-event', 'msg from grandson')">{{msg}}</div>
```

## provide 与 inject

-   在祖先组件定义 `provide` 属性，返回传递的值
-   在后代组件通过 `inject` 接收组件传递过来的值

祖先组件

```js
provide(){
    return {
        foo:'foo'
    }
}
```

后代组件

```js
inject: ['foo']; // 获取到祖先组件传递过来的值
```

## vuex

复杂关系的组件数据传递

-   `Vuex` 作用相当于一个用来存储共享变量的容器
-   `state` 用来存放共享变量的地方
-   `getter`，可以增加一个 `getter` 派生状态，(相当于 `store` 中的计算属性），用来获得共享变量的值
-   `mutations` 用来存放修改 `state` 的方法
-   `actions` 用来存放修改 `state` 的方法，不过是在 `mutations` 的基础上进行,常用来做一些异步操作

# nextTick

在下次 `DOM` 更新循环结束之后再执行回调，修改数据之后使用这个方法，获取更新后的 `DOM`

数据在发生变化时，`vue` 不会立即更新 `DOM`，而是将修改数据的操作放在一个异步操作的队列中，
如果一直修改相同数据，异步操作队列还会进行去重，等同一事件循环中的所有数据变化完成之后，
才会将队列中的事件进行处理，然后进行 `DOM` 的更新

有了 `nextTick` 机制，视图只需要更新一次，`nextTick` 本质是一种优化策略

# slot(插槽)

`web` 组件内的一个占位符
通过插槽用户可以拓展组件，去更好地复用组件和做定制化处理

# key

每一个`vnode`的唯一`id`，也是`diff`的一种优化策略，根据`key`，能更快，更准确找到对应的`vnode`节点
设置`key`能减少对页面的`DOM`操作，提高了`diff`效率

# 虚拟 DOM(virtual DOM)

对真实`DOM`的抽象，以 JS 对象作为基础的树，用对象的属性来描述节点，通过一系列操作使这棵树映射到真实环境

## 优势

-   减少 JS 操作真实`DOM`带来的性能消耗，提高了性能
-   抽象了原本的渲染过程，实现了跨平台的能力

# diff 算法

通过同层的树节点进行比较的高效算法

## 特点

-   比较只会在同层级进行，不会跨层级比较
-   在比较的过程中，循环从两边向中间比较
