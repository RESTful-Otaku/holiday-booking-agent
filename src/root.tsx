import { createSignal } from "solid-js";
import { styled } from "solid-styled-components";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
`;

export default function Chat() {
  return (
    <Wrapper>
      <p>Welcome to the chat!</p>
    </Wrapper>
  );
}
