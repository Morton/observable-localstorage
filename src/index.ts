import ObservableDummyStorage from './lib/ObservableDummyStorage';
import ObservableLocalStorage from './lib/ObservableLocalStorage';

const hasWindow = !!(typeof window !== 'undefined');
const observableLocalStorage = hasWindow
  ? new ObservableLocalStorage()
  : new ObservableDummyStorage();

export default observableLocalStorage;
