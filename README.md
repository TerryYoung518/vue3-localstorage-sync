# vue3-localstorage-sync [![npm](https://img.shields.io/npm/v/vue3-localstorage-sync.svg)](https://www.npmjs.com/package/vue3-localstorage-sync)

English|[中文](./README.zh.md)

This project is based on Vue3's `watch` method and browser's native `localStorage`, achieving data synchronization between same-origin pages by listening to the `storage` event of the `window` object.

## Installation

```bash
npm i vue3-localstorage-sync
```

## Usage

Import `bind` and `removeStorageListener` methods from `vue3-localstorage-sync`:

```typescript
import { bind, removeStorageListener } from 'vue3-localstorage-sync'
```

Create a `ref` or `reactive` object and pass in a unique key as the binding basis. Optionally, use the returned proxy object. The data will be stored in the browser's `localStorage` under the provided key.

```typescript
// Method 1
const count = bind(ref(0), 'count');

// Method 2
const count = ref(0);
bind(count, 'count')
```

Call `removeStorageListener()` in the `onBeforeUnmount` lifecycle hook of Vue3 to clean up resources.

```typescript
onBeforeUnmount(() => {
  removeStorageListener()
})
```