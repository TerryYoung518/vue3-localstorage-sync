import { Ref, UnwrapNestedRefs, UnwrapRef, WatchSource, isRef, onMounted, onUnmounted, watch } from "vue";

export function useBind<T>(target: UnwrapNestedRefs<T> | Ref<UnwrapRef<T>>, fieldKey: string): UnwrapNestedRefs<T> | Ref<UnwrapRef<T>> {
  let loadFunc: () => void;

  if (isRef(target)) {
    loadFunc = () => {
      if (localStorage.getItem(fieldKey) === null) return;
      let newValue = JSON.parse(localStorage.getItem(fieldKey)!);
      (target as Ref).value = newValue;
    };
  } else {
    loadFunc = () => {
      if (localStorage.getItem(fieldKey) === null) return;
      let newTarget = JSON.parse(localStorage.getItem(fieldKey)!);
      for (const key in newTarget) {
        (target as any)[key] = (newTarget as any)[key];
      }
    };
  }

  const handleStorageEvent = (e: Event) => {
    const _fieldKey = (e as StorageEvent).key;
    if(fieldKey === _fieldKey) loadFunc();
  };

  watch(
    target as WatchSource<T>,
    (value, oldValue) => {
      if (oldValue === undefined) {
        loadFunc();
      } else {
        localStorage.setItem(fieldKey, JSON.stringify(value));
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );

  onMounted(() => {
    window.addEventListener("storage", handleStorageEvent);
  })

  onUnmounted(() => {
    window.removeEventListener("storage", handleStorageEvent);
  })

  return target;
}
