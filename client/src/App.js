import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Navbar } from './components';
import Routes from './routes';
import configureStore from './store';

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar />
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
