import PropTypes from 'prop-types';
import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../components';
import { addFriendAction } from '../../store/friends/actions';

const UserList = memo(({ users }) => {
  const dispatch = useDispatch();
  const totalPages = Math.ceil(users.length / 5);
  const [currentPage, setCurrentPage] = useState(0);
  const displayedUsers = useMemo(
    () => users.slice(currentPage * 5, (currentPage + 1) * 5),
    [users, currentPage]
  );

  const addFriendButtonOnClick = useCallback(
    (name) => {
      dispatch(addFriendAction(name));
    },
    [dispatch]
  );

  if (users.length === 0) {
    return <div>No Users found</div>;
  }

  return (
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
  );
});

const StyledUserList = styled.ul``;

const User = styled.li``;

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default UserList;
