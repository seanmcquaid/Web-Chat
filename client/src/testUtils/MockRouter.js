import { MemoryRouter } from 'react-router-dom';

const MockRouter = ({ initialRoute, children }) => (
  <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
);

export default MockRouter;
