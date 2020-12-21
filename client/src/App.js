import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Navbar } from './components';
import Routes from './routes';
import configureStore from './store';
import { BrowserRouter } from 'react-router-dom';

const { store, persistor } = configureStore();

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navbar />
          <Routes />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
