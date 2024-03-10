import { Ref, isRef, watch } from "vue";

export class LocalstorageManager {
  private static instance: LocalstorageManager;

  private readonly saves: Record<string, Function> = {};
  private readonly loads: Record<string, Function> = {};

  private constructor() {
    window.addEventListener("storage", this.handleStorageEvent);
  }

  public static getInstance(): LocalstorageManager {
    if (!LocalstorageManager.instance) {
      LocalstorageManager.instance = new LocalstorageManager();
    }
    return LocalstorageManager.instance;
  }

  private handleStorageEvent = (e: Event) => {
    const fieldKey = (e as StorageEvent).key ?? "";
    this.loads[fieldKey]?.();
  };

  public save(fieldKey: string) {
    this.saves[fieldKey]?.();
  }

  public load(fieldKey: string) {
    this.loads[fieldKey]?.();
  }

  public bindSave(callback: () => void, fieldKey: string): void {
    this.saves[fieldKey] = this.saves[fieldKey] || callback;
  }

  public bindLoad(callback: () => void, fieldKey: string): void {
    this.loads[fieldKey] = this.loads[fieldKey] || callback;
  }

  public close(): void {
    window.removeEventListener("storage", this.handleStorageEvent);
  }
}

export function bind<T extends object>(target: T, fieldKey: string): T {
  const manager = LocalstorageManager.getInstance();

  if (isRef(target)) {
    manager.bindSave(() => {
      localStorage.setItem(fieldKey, JSON.stringify((target as Ref).value));
    }, fieldKey);

    manager.bindLoad(() => {
      let newValue = JSON.parse(localStorage.getItem(fieldKey) ?? "{}");
      (target as Ref).value = newValue;
    }, fieldKey);
  } else {
    manager.bindSave(() => {
      localStorage.setItem(fieldKey, JSON.stringify(target));
    }, fieldKey);

    manager.bindLoad(() => {
      let newTarget = JSON.parse(localStorage.getItem(fieldKey) ?? "{}");
      for (const key in newTarget) {
        (target as any)[key] = (newTarget as any)[key];
      }
    }, fieldKey);
  }

  watch(
    target,
    (value, oldValue) => {
      if (oldValue === undefined) {
        manager.load(fieldKey);
      } else {
        localStorage.setItem(fieldKey, JSON.stringify(value));
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );

  return target;
}

export function removeStorageListener(): void {
  const manager = LocalstorageManager.getInstance();
  manager.close();
}
