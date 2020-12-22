import Navbar from '../Navbar';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../../store';

describe('<Navbar/>', () => {
  it('Authenticated', () => {
    const initialState = {
      user: {
        token: 'Valid Token Here',
      },
      error: {
        errorMessage: '',
      },
      loading: {
        isLoading: false,
      },
      friends: {
        friendsList: [],
      },
    };
    const { store } = configureStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('User Home')).toBeInTheDocument();
  });

  it('Not authenticated', () => {
    const initialState = {
      user: {
        token: null,
      },
      error: {
        errorMessage: '',
      },
      loading: {
        isLoading: false,
      },
      friends: {
        friendsList: [],
      },
    };
    const { store } = configureStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
