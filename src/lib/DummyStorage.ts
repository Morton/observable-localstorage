export default class DummyStorage implements Storage {
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
}
