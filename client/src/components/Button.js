import { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = memo(({ onClick, type, children, disabled }) => (
  <StyledButton onClick={onClick} type={type} disabled={disabled}>
    {children}
  </StyledButton>
));

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

const StyledButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 0.75rem;
  border-radius: 10px;
  border: none;
  margin: 0.75rem;
  background-color: #eef0eb;
  color: black;
`;

export default Button;
