import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import * as userService from '../../api/userService';
import ProtectedRoute from '../../routes/ProtectedRoute';
import configureStore from '../../store';
import MockRouter from '../../testUtils/MockRouter';
import FriendsList from '../FriendsList';

describe('<FriendsList/>', () => {
  it('Online status', async () => {
    const initialState = {
      user: {
        token: 'valid token',
      },
    };
    const { store } = configureStore(initialState);

    jest.spyOn(userService, 'getUserInfo').mockResolvedValue({
      data: {
        friends: [{ name: 'sean.mcquaid', _id: '1', isOnline: true }],
      },
    });

    render(
      <Provider store={store}>
        <MockRouter initialRoute='/friendsList'>
          <Switch>
            <ProtectedRoute exact path='/friendsList' component={FriendsList} />
          </Switch>
        </MockRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText('sean.mcquaid')).toBeInTheDocument()
    );

    expect(screen.getByText('Online')).toBeInTheDocument();
  });
  it('Away status', async () => {
    const initialState = {
      user: {
        token: 'valid token',
      },
    };
    const { store } = configureStore(initialState);

    jest.spyOn(userService, 'getUserInfo').mockResolvedValue({
      data: {
        friends: [{ name: 'sean.mcquaid', _id: '1', isOnline: false }],
      },
    });

    render(
      <Provider store={store}>
        <MockRouter initialRoute='/friendsList'>
          <Switch>
            <ProtectedRoute exact path='/friendsList' component={FriendsList} />
          </Switch>
        </MockRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText('sean.mcquaid')).toBeInTheDocument()
    );

    expect(screen.getByText('Away')).toBeInTheDocument();
  });
});
