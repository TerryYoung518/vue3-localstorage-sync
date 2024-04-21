# vue3-localstorage-sync [![npm](https://img.shields.io/npm/v/vue3-localstorage-sync.svg)](https://www.npmjs.com/package/vue3-localstorage-sync)

English|[中文](./README.zh.md)

This project is based on Vue3's `watch` method and browser's native `localStorage`, achieving data synchronization between same-origin pages by listening to the `storage` event of the `window` object.

## Installation

```bash
npm i vue3-localstorage-sync
```

## Usage

Import `useBind` method from `vue3-localstorage-sync`:

```typescript
import { useBind } from 'vue3-localstorage-sync'
```

Create a `ref` or `reactive` object and pass in a unique key as the binding basis. Optionally, use the returned reactive object. The data will be stored in the browser's `localStorage` under the provided key.

```typescript
// Method 1
const count = useBind(ref(0), 'count');

// Method 2
const count = ref(0);
useBind(count, 'count')
```
