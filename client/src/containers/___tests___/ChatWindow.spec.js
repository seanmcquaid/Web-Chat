import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import * as userService from '../../api/userService';
import ProtectedRoute from '../../routes/ProtectedRoute';
import configureStore from '../../store';
import MockRouter from '../../testUtils/MockRouter';
import ChatWindow from '../ChatWindow';
import socket from '../../sockets';
import { RECEIVE_IS_FRIEND_TYPING } from '../../sockets/types';

describe('<ChatWindow/>', () => {
  it('Friend is typing displays', async () => {
    const initialState = {
      user: {
        token: 'valid token',
      },
    };
    const { store } = configureStore(initialState);

    render(
      <Provider store={store}>
        <MockRouter initialRoute='/chatWindow/sean.mcquaid'>
          <Switch>
            <ProtectedRoute
              exact
              path='/chatWindow/:name'
              component={ChatWindow}
            />
          </Switch>
        </MockRouter>
      </Provider>
    );
  });

  it('Sent message displays', () => {
    const initialState = {
      user: {
        token: 'valid token',
      },
    };
    const { store } = configureStore(initialState);

    render(
      <Provider store={store}>
        <MockRouter initialRoute='/chatWindow/sean.mcquaid'>
          <Switch>
            <ProtectedRoute
              exact
              path='/chatWindow/:name'
              component={ChatWindow}
            />
          </Switch>
        </MockRouter>
      </Provider>
    );
  });
});
