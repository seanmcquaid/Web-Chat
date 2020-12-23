import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../../routes/ProtectedRoute';
import configureStore from '../../store';
import MockRouter from '../../testUtils/MockRouter';
import Login from '../Login';
import UserHome from '../UserHome';
import * as userService from '../../api/userService';

describe('<Login/>', () => {
  it('Successful login redirects the user', async () => {
    const { store } = configureStore();
    render(
      <Provider store={store}>
        <MockRouter initialRoute='/login'>
          <Switch>
            <Route exact path='/login' component={Login} />
            <ProtectedRoute exact path='/userHome' component={UserHome} />
          </Switch>
        </MockRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter username here'), {
      target: { value: 'usernameHere', name: 'username' },
    });
    expect(screen.getByPlaceholderText('Enter username here').value).toEqual(
      'usernameHere'
    );

    fireEvent.change(screen.getByPlaceholderText('Enter password here'), {
      target: { value: 'passwordHere', name: 'password' },
    });
    expect(screen.getByPlaceholderText('Enter password here').value).toEqual(
      'passwordHere'
    );

    expect(screen.getByText('Submit')).toBeInTheDocument();

    jest.spyOn(userService, 'login').mockResolvedValue({
      data: {
        token: 'Valid token',
      },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(screen.getByText('Web Chat Home')).toBeInTheDocument()
    );
  });
});
