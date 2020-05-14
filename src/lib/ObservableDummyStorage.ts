import { Subscribable, Unsubscribable } from './rxInterfaces';

import { PartialStorageEvent } from './ObservableStorage';

export default class ObservableDummyStorage
  implements Storage, Subscribable<PartialStorageEvent> {
  [name: string]: any;
  public length: number = 0;
  public clear(): void {}
  public getItem(): string | null {
    return null;
  }
  public key(): string | null {
    return null;
  }
  public removeItem(): void {}
  public setItem(): void {}

  public subscribe(): Unsubscribable {
    return { unsubscribe(): void {} };
  }
}
