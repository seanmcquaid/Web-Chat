import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Home, UserHome } from '../../containers';
import ProtectedRoute from '../ProtectedRoute';
import configureStore from '../../store';
import MockRouter from '../../testUtils/MockRouter';

describe('<ProtectedRoute/>', () => {
  it('No token', async () => {
    const { store } = configureStore();

    render(
      <MockRouter initialRoute='/userHome'>
        <Provider store={store}>
          <Switch>
            <Route exact path='/' component={Home} />
            <ProtectedRoute exact path='/userHome' component={UserHome} />
          </Switch>
        </Provider>
      </MockRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Web Chat')).toBeInTheDocument()
    );
  });

  it('Token provided', async () => {
    const initialState = {
      user: {
        token: 'Valid token',
      },
    };
    const { store } = configureStore(initialState);

    render(
      <MockRouter initialRoute='/userHome'>
        <Provider store={store}>
          <Switch>
            <Route exact path='/' component={Home} />
            <ProtectedRoute exact path='/userHome' component={UserHome} />
          </Switch>
        </Provider>
      </MockRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Web Chat Home')).toBeInTheDocument()
    );
  });
});
