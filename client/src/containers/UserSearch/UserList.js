import PropTypes from 'prop-types';
import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components';
import { addFriendAction } from '../../store/friends/actions';

const UserList = memo(({ users }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const totalPages = Math.ceil(users.length / 5);
  const [currentPage, setCurrentPage] = useState(0);
  const displayedUsers = useMemo(
    () => users.slice(currentPage * 5, (currentPage + 1) * 5),
    [users, currentPage]
  );

  const addFriendButtonOnClick = useCallback(
    (name) => {
      dispatch(addFriendAction(name)).then(() => {
        history.push('/friendsList');
      });
    },
    [dispatch, history]
  );

  const decrementPageButtonOnClick = useCallback(() => {
    setCurrentPage((pageNumber) => pageNumber - 1);
  }, []);

  const incrementPageButtonOnClick = useCallback(() => {
    setCurrentPage((pageNumber) => pageNumber + 1);
  }, []);

  if (users.length === 0) {
    return <div>No Users found</div>;
  }

  return (
    <>
      <StyledUserList>
        {displayedUsers.map(({ username, _id }) => (
          <User key={_id}>
            {username}{' '}
            <Button
              onClick={() => addFriendButtonOnClick(username)}
              type='button'
            >
              Add Friend
            </Button>
          </User>
        ))}
      </StyledUserList>
      <ListFooter>
        <Button
          type='button'
          onClick={decrementPageButtonOnClick}
          disabled={currentPage === 0}
        >
          Prev Page
        </Button>
        <PageText>
          {currentPage + 1} of {totalPages}
        </PageText>
        <Button
          type='button'
          onClick={incrementPageButtonOnClick}
          disabled={currentPage + 1 === totalPages}
        >
          Next Page
        </Button>
      </ListFooter>
    </>
  );
});

const StyledUserList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const User = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  width: 100%;
  max-width: 16rem;
  margin: 0.5rem;
  font-family: 'PT Serif', serif;
`;

const ListFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PageText = styled.span`
  font-family: 'PT Serif', serif;
`;

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default UserList;
