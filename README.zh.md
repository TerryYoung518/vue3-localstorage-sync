# vue3-localstorage-sync
# Vue3 本地存储同步

[English](./README.md)|中文

本项目基于Vue3的`watch`方法与浏览器原生的`localStorage`，通过监听`window`对象的`storage`事件实现同源页面间的数据同步。

## 使用方法

从`vue3-localstorage-sync`中引入`bind`与`removeStorageListener`方法：

```typescript
import { bind, removeStorageListener } from 'vue3-localstorage-sync'
```

创建一个`ref`或`reactive`对象，并传入一个唯一的键名作为绑定依据，你也可以选择使用返回的代理对象。有效数据将被存储在浏览器的`localStorage`中，对应传入的键名。

```typescript
// 方法 1
const count = bind(ref(0), 'count');

// 方法 2
const count = ref(0);
bind(count, 'count')
```

在Vue3的`onBeforeUnmount`生命周期钩子中调用`removeStorageListener()`来清理资源。

```typescript
onBeforeUnmount(() => {
  removeStorageListener()
})
``` 