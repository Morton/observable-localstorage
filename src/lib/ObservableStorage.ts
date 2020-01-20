import {
  ObserverCallback,
  PartialObserver,
  Subscribable,
  Unsubscribable
} from './rxInterfaces';

type PartialStorageEvent = Pick<
  StorageEvent,
  'key' | 'newValue' | 'oldValue' | 'storageArea'
>;

export default class ObservableLocalStorage
  implements Storage, Subscribable<PartialStorageEvent> {
  public length = 0;
  private readonly backend: Storage;
  private observers: Array<ObserverCallback<PartialStorageEvent>>;

  constructor(storageBackend: Storage) {
    this.backend = {
      clear: storageBackend.clear.bind(storageBackend),
      getItem: storageBackend.getItem.bind(storageBackend),
      key: storageBackend.key.bind(storageBackend),
      length: storageBackend.length,
      removeItem: storageBackend.removeItem.bind(storageBackend),
      setItem: storageBackend.setItem.bind(storageBackend)
    };
    this.observers = [];

    window.addEventListener('storage', this.notifyObservers.bind(this));
  }

  public clear(): void {
    this.backend.clear();
  }

  public getItem(key: string): string | null {
    return this.backend.getItem(key);
  }

  public key(index: number): string | null {
    return this.backend.key(index);
  }

  public removeItem(key: string): void {
    const oldValue = this.getItem(key);
    this.backend.removeItem(key);
    this.notifyObservers({
      key,
      newValue: null,
      oldValue,
      storageArea: this.backend
    });
  }

  public setItem(key: string, value: string): void {
    const oldValue = this.getItem(key);
    this.backend.setItem(key, value);
    this.notifyObservers({
      key,
      newValue: value,
      oldValue,
      storageArea: this.backend
    });
  }

  public subscribe(
    observer?:
      | PartialObserver<PartialStorageEvent>
      | null
      | undefined
      | ObserverCallback<PartialStorageEvent>
  ): Unsubscribable {
    function getObserverFn(
      input?:
        | PartialObserver<PartialStorageEvent>
        | null
        | undefined
        | ObserverCallback<PartialStorageEvent>
    ): ObserverCallback<PartialStorageEvent> | null {
      if (!input) {
        return null;
      } else if (input instanceof Function) {
        return input;
      } else if (!input.next) {
        return null;
      } else {
        return input.next;
      }
    }

    const observerFn = getObserverFn(observer);
    if (observerFn) {
      this.observers.push(observerFn);
      const unsubscribe = () => {
        const index = this.observers.indexOf(observerFn);
        if (index > 0 && index < this.observers.length) {
          delete this.observers[index];
        }
      };
      return {
        unsubscribe
      };
    } else {
      return { unsubscribe(): void {} };
    }
  }

  private notifyObservers(event: PartialStorageEvent): void {
    this.observers.forEach(observer => observer(event));
  }
}
