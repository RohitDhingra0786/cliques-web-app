const { default: styled } = require("styled-components");
const { Colors } = require("theme/colors");

const Button = ({ title, margin, ...props }) => {
  return (
    <Container margin={margin} {...props}>
      {title}
    </Container>
  );
};

export default Button;

const Container = styled.button`
  height: 40px;
  background-color: ${Colors.primary};
  border-radius: 50px;
  outline: 0;
  border: 0;
  margin: ${(props) => props?.margin || "10px 0"};
  color: ${Colors.white};
  cursor: pointer;
`;
