import ObservableStorage from './ObservableStorage';

export default class ObservableLocalStorage extends ObservableStorage {
  constructor() {
    super(window.localStorage);
  }
}
