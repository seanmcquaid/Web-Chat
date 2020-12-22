import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../../store';
import { BrowserRouter } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';

describe('<ErrorMessage/>', () => {
  it('Error message displays when in redux store', () => {
    const initialState = {
      user: {
        token: null,
      },
      error: {
        errorMessage: 'Error message here',
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
          <ErrorMessage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Error message here')).toBeInTheDocument();
  });
});
