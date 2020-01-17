export interface PartialObserver<T> {
  next: (value: T) => void;
}
export interface Unsubscribable {
  unsubscribe(): void;
}
export interface Subscribable<T> {
  subscribe(
    observer?: PartialObserver<T> | null | undefined | ObserverCallback<T>
  ): Unsubscribable;
}

export type ObserverCallback<T> = (value: T) => void;
