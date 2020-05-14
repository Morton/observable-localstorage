import DummyStorage from './DummyStorage';
import ObservableStorage from './ObservableStorage';

export default class ObservableDummyStorage extends ObservableStorage {
  constructor() {
    super(new DummyStorage());
  }
}
