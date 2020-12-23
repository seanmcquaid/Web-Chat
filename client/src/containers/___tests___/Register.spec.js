import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../../routes/ProtectedRoute';
import configureStore from '../../store';
import MockRouter from '../../testUtils/MockRouter';
import Register from '../Register';
import UserHome from '../UserHome';
import * as userService from '../../api/userService';

describe('<Register/>', () => {
  it("Passwords don't match", async () => {
    const { store } = configureStore();
    render(
      <Provider store={store}>
        <MockRouter initialRoute='/register'>
          <Switch>
            <Route exact path='/register' component={Register} />
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

    fireEvent.change(
      screen.getByPlaceholderText('Enter confirm password here'),
      {
        target: { value: 'confirmPasswordHere', name: 'confirmPassword' },
      }
    );
    expect(
      screen.getByPlaceholderText('Enter confirm password here').value
    ).toEqual('confirmPasswordHere');

    await waitFor(() =>
      expect(
        screen.getByText("These passwords don't match!")
      ).toBeInTheDocument()
    );
  });

  it('Successful register redirects the user', async () => {
    const { store } = configureStore();
    render(
      <Provider store={store}>
        <MockRouter initialRoute='/register'>
          <Switch>
            <Route exact path='/register' component={Register} />
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

    fireEvent.change(
      screen.getByPlaceholderText('Enter confirm password here'),
      {
        target: { value: 'passwordHere', name: 'confirmPassword' },
      }
    );
    expect(
      screen.getByPlaceholderText('Enter confirm password here').value
    ).toEqual('passwordHere');

    jest.spyOn(userService, 'register').mockResolvedValue({
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
