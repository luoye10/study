## vue 记忆比较深刻问题

### vue 初始化和注册路由时引用 vue 的版本不一致，导致抛出 `router-view` 未注册的错误

原因：由于在项目中使用了 `template` 字符串的自定义组件，引用的是 `vue` 的默认版本  
`import Vue from 'vue'` 导致报错，会警告当前版本错误，没有预编译功能，  
因此，需要导入拥有预编译功能的版本 `import Vue from 'vue/dist/vue.esm'`  
而注册路由时，引用的是 `vue` 的运行时版本(runtime)，没有编译功能，  
导致注册路由和初始化项目的 `vue` 对象不同，因此报错， `router-view` 未注册。
