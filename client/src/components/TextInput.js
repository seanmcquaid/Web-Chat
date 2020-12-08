import { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextInput = memo(
  ({ type, name, onChange, value, label, placeholder }) => (
    <Label>
      {label}
      <StyledTextInput
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </Label>
  )
);

const Label = styled.label``;

const StyledTextInput = styled.input``;

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextInput;
