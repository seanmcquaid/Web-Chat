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

const Label = styled.label`
  font-family: 'PT Serif', serif;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTextInput = styled.input`
  padding: 0.25rem;
  margin: 0.25rem;
  border-radius: 8px;
  border: none;
  font-family: 'PT Serif', serif;
  outline: none;
`;

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextInput;
