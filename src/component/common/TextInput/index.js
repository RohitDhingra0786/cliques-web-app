import styled from "styled-components";
import { Colors } from "theme/colors";

const TextInput = ({ error, ...props }) => {
  return (
    <>
      <Input {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};

export default TextInput;

const Input = styled.input`
  height: 45px;
  border-radius: 50px;
  background-color: ${Colors.gray};
  margin: 10px 0;
  border: 0;
  padding: 0 15px;
  outline: 0;
`;

const ErrorText = styled.span`
  font-size: 12px;
  margin: 4px;
  padding-left: 10px;
  color: ${Colors.red};
`;
