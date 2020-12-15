import { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { LinkButton } from '../../components';
import { friendsListSelector } from '../../store/friends/selectors';

const Friends = memo(() => {
  const friendsList = useSelector(friendsListSelector);

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

const StyledFriends = styled.ul``;

const Friend = styled.li``;

const FriendName = styled.span``;

const Status = styled.span``;

export default Friends;
