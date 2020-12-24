import Axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAllUsers } from '../../api/userService';
import { ErrorMessage, H1, LoadingSpinner, TextInput } from '../../components';
import Fuse from 'fuse.js';
import { useSelector } from 'react-redux';
import { tokenSelector } from '../../store/user/selectors';
import styled from 'styled-components';
import UserList from './UserList';

const UserSearch = () => {
  const [state, setState] = useState({
    isLoading: true,
    inputText: '',
    originalUsers: [],
    searchedUsers: [],
  });
  const { isLoading, inputText, originalUsers, searchedUsers } = state;
  const isMounted = useRef(true);
  const token = useSelector(tokenSelector);

  useEffect(() => {
    if (isMounted.current) {
      const cancelToken = Axios.CancelToken;
      const source = cancelToken.source();
      const config = {
        cancelToken: source.token,
        headers: {
          Authorization: token,
        },
      };
      getAllUsers(config)
        .then(({ data: { users } }) => {
          setState((prevState) => ({
            ...prevState,
            originalUsers: users,
            searchedUsers: users,
            isLoading: false,
          }));
          source.cancel();
        })
        .catch((err) => {
          console.log(err);
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
          }));
          source.cancel();
        });
    }
    return () => {
      isMounted.current = false;
    };
  }, [token]);

  const onChange = useCallback(
    (event) => {
      const options = {
        keys: ['username'],
        isCaseSensitive: false,
        includeScore: true,
      };

      const value = event.target.value;

      const fuse = new Fuse(originalUsers, options);
      const results = fuse.search(value);

      setState((prevState) => ({
        ...prevState,
        [event.target.name]: value,
        searchedUsers:
          value.length > 0 ? results.map(({ item }) => item) : originalUsers,
      }));
    },
    [originalUsers]
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <PageContainer>
      <Header>
        <H1>User Search</H1>
        <ErrorMessage />
      </Header>
      <Main>
        <TextInput
          onChange={onChange}
          value={inputText}
          name='inputText'
          type='text'
          placeholder='Search for a user here!'
        />
        <UserList users={searchedUsers} />
      </Main>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Header = styled.header`
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  height: 80%;
  width: 100%;
`;

export default UserSearch;
