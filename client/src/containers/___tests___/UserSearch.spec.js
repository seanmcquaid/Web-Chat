import configureStore from '../../store';
import * as userService from '../../api/userService';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import MockRouter from '../../testUtils/MockRouter';
import { Switch } from 'react-router-dom';
import ProtectedRoute from '../../routes/ProtectedRoute';
import UserSearch from '../UserSearch';
import FriendsList from '../FriendsList';

describe('<UserSearch/>', () => {
  it('Loading Spinner', () => {
    const initialState = {
      user: {
        token: 'valid token',
      },
    };
    const { store } = configureStore(initialState);

    jest.spyOn(userService, 'getAllUsers').mockResolvedValue({
      data: {
        users: [
          { username: 'sean.mcquaid', _id: 1 },
          { username: 'hello.there', _id: 2 },
        ],
      },
    });

    render(
      <Provider store={store}>
        <MockRouter initialRoute='/userSearch'>
          <Switch>
            <ProtectedRoute exact path='/userSearch' component={UserSearch} />
            <ProtectedRoute exact path='/friendsList' component={FriendsList} />
          </Switch>
        </MockRouter>
      </Provider>
    );

    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
  });

  describe('User Search', () => {
    it('Valid search string', async () => {
      const initialState = {
        user: {
          token: 'valid token',
        },
      };
      const { store } = configureStore(initialState);

      jest.spyOn(userService, 'getAllUsers').mockResolvedValue({
        data: {
          users: [
            { username: 'sean.mcquaid', _id: 1 },
            { username: 'hello.there', _id: 2 },
          ],
        },
      });

      render(
        <Provider store={store}>
          <MockRouter initialRoute='/userSearch'>
            <Switch>
              <ProtectedRoute exact path='/userSearch' component={UserSearch} />
              <ProtectedRoute
                exact
                path='/friendsList'
                component={FriendsList}
              />
            </Switch>
          </MockRouter>
        </Provider>
      );

      await waitFor(() =>
        expect(screen.queryByTestId('loadingSpinner')).toBeNull()
      );

      fireEvent.change(screen.getByPlaceholderText('Search for a user here!'), {
        target: { value: 'sean' },
      });
      expect(
        screen.getByPlaceholderText('Search for a user here!')
      ).toHaveValue('sean');

      await waitFor(() =>
        expect(screen.getByText('sean.mcquaid')).toBeInTheDocument()
      );

      expect(screen.queryByText('hello.there')).toBeNull();
    });

    it('Search string of length 0 returns original users', async () => {
      const initialState = {
        user: {
          token: 'valid token',
        },
      };
      const { store } = configureStore(initialState);

      jest.spyOn(userService, 'getAllUsers').mockResolvedValue({
        data: {
          users: [
            { username: 'sean.mcquaid', _id: 1 },
            { username: 'hello.there', _id: 2 },
          ],
        },
      });

      render(
        <Provider store={store}>
          <MockRouter initialRoute='/userSearch'>
            <Switch>
              <ProtectedRoute exact path='/userSearch' component={UserSearch} />
              <ProtectedRoute
                exact
                path='/friendsList'
                component={FriendsList}
              />
            </Switch>
          </MockRouter>
        </Provider>
      );

      await waitFor(() =>
        expect(screen.queryByTestId('loadingSpinner')).toBeNull()
      );

      fireEvent.change(screen.getByPlaceholderText('Search for a user here!'), {
        target: { value: 'sean' },
      });
      expect(
        screen.getByPlaceholderText('Search for a user here!')
      ).toHaveValue('sean');

      await waitFor(() =>
        expect(screen.getByText('sean.mcquaid')).toBeInTheDocument()
      );

      expect(screen.queryByText('hello.there')).toBeNull();

      fireEvent.change(screen.getByPlaceholderText('Search for a user here!'), {
        target: { value: '' },
      });
      expect(
        screen.getByPlaceholderText('Search for a user here!')
      ).toHaveValue('');

      await waitFor(() =>
        expect(screen.getByText('sean.mcquaid')).toBeInTheDocument()
      );

      await waitFor(() =>
        expect(screen.getByText('hello.there')).toBeInTheDocument()
      );
    });
  });

  describe('<UserList/>', () => {
    it('Only 5 users displays', async () => {
      const initialState = {
        user: {
          token: 'valid token',
        },
      };
      const { store } = configureStore(initialState);

      jest.spyOn(userService, 'getAllUsers').mockResolvedValue({
        data: {
          users: [
            { username: 'hello.there', _id: 1 },
            { username: 'hello.there', _id: 2 },
            { username: 'hello.there', _id: 3 },
            { username: 'hello.there', _id: 4 },
            { username: 'hello.there', _id: 5 },
            { username: 'hello.there', _id: 6 },
          ],
        },
      });

      render(
        <Provider store={store}>
          <MockRouter initialRoute='/userSearch'>
            <Switch>
              <ProtectedRoute exact path='/userSearch' component={UserSearch} />
              <ProtectedRoute
                exact
                path='/friendsList'
                component={FriendsList}
              />
            </Switch>
          </MockRouter>
        </Provider>
      );

      await waitFor(() =>
        expect(screen.queryByTestId('loadingSpinner')).toBeNull()
      );

      expect(screen.queryAllByText('hello.there').length).toEqual(5);
    });

    it('Adding friend redirects user to friendsList', async () => {
      const initialState = {
        user: {
          token: 'valid token',
        },
      };
      const { store } = configureStore(initialState);

      jest.spyOn(userService, 'getAllUsers').mockResolvedValue({
        data: {
          users: [{ username: 'hello.there', _id: 1 }],
        },
      });

      render(
        <Provider store={store}>
          <MockRouter initialRoute='/userSearch'>
            <Switch>
              <ProtectedRoute exact path='/userSearch' component={UserSearch} />
              <ProtectedRoute
                exact
                path='/friendsList'
                component={FriendsList}
              />
            </Switch>
          </MockRouter>
        </Provider>
      );

      await waitFor(() =>
        expect(screen.queryByTestId('loadingSpinner')).toBeNull()
      );
    });

    it('Decrement Page Button on click', () => {});

    it('Increment Page Button on click', () => {});

    it('No users found', () => {});

    it('Decrement button disabled', () => {});

    it('Increment button disabled', () => {});
  });
});
