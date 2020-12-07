import { memo } from 'react';
import styled from 'styled-components';

const TextInput = memo(({ type, name, onChange, value, label }) => (
  <Label>
    {label}
    <StyledTextInput
      type={type}
      name={name}
      onChange={onChange}
      value={value}
    />
  </Label>
));

const Label = styled.label``;

const StyledTextInput = styled.input``;

export default TextInput;
