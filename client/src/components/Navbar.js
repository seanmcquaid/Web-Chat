import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logoutAction } from '../store/user/actions';
import { tokenSelector } from '../store/user/selectors';

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  const logoutButtonOnClick = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const navLinks = token ? (
    <>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/register'>Register</NavLink>
    </>
  ) : (
    <>
      <NavLink to='/userHome'>User Home</NavLink>
      <NavLink to='/friendsList'>Friends List</NavLink>
      <NavLink to='/userSearch'>User Search</NavLink>
      <LogoutButton onClick={logoutButtonOnClick}>Logout</LogoutButton>
    </>
  );

  return <StyledNav>{navLinks}</StyledNav>;
};

const StyledNav = styled.nav``;

const NavLink = styled(Link)``;

const LogoutButton = styled.button``;

export default Navbar;
