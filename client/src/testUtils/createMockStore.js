import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const createMockStore = (initialState) => mockStore(initialState);

export default createMockStore;
