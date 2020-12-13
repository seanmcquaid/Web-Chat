import Axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAllUsers } from '../../api/userService';
import { H1, LoadingSpinner, TextInput } from '../../components';
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
          setState({
            ...state,
            originalUsers: users,
            searchedUsers: users,
            isLoading: false,
          });
          source.cancel();
        })
        .catch((err) => {
          console.log(err);
          setState({
            ...state,
            isLoading: false,
          });
          source.cancel();
        });
    }
    return () => {
      isMounted.current = false;
    };
  }, [token, state]);

  console.log(state);

  const onChange = useCallback(
    (event) => {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    },
    [state]
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <PageContainer>
      <Header>
        <H1>User Search</H1>
      </Header>
      <MainContent>
        <TextInput
          onChange={onChange}
          value={inputText}
          name='inputText'
          type='text'
          placeholder='Search for a user here!'
        />
        <UserList users={searchedUsers} />
      </MainContent>
    </PageContainer>
  );
};

const PageContainer = styled.div``;

const Header = styled.header``;

const MainContent = styled.main``;

export default UserSearch;
