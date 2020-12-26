import { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { LinkButton } from '../../components';
import { friendsListSelector } from '../../store/friends/selectors';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfoAction } from '../../store/user/actions';

const Friends = memo(() => {
  const friendsList = useSelector(friendsListSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfoAction());
  }, [dispatch]);

  return (
    <StyledFriends>
      {friendsList.map((friend) => (
        <Friend key={friend._id}>
          <FriendName>{friend.name}</FriendName>
          <Status>{friend.isOnline ? 'Online' : 'Away'}</Status>
          <LinkButton to={`/chatWindow/${friend.name}`}>Chat</LinkButton>
        </Friend>
      ))}
    </StyledFriends>
  );
});

const StyledFriends = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Friend = styled.li`
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

const FriendName = styled.span``;

const Status = styled.span``;

export default Friends;
