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
  children: PropTypes.element.isRequired,
  disabled: PropTypes.bool,
};

const StyledButton = styled.button``;

export default Button;
