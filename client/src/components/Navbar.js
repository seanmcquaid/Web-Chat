import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { tokenSelector } from '../store/user/selectors';

const Navbar = () => {
  const token = useSelector(tokenSelector);

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
      <LogoutButton>Logout</LogoutButton>
    </>
  );

  return <StyledNav>{navLinks}</StyledNav>;
};

const StyledNav = styled.nav``;

const NavLink = styled(Link)``;

const LogoutButton = styled.button``;

export default Navbar;
