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

const MessageList = styled("div")`
  flex: 1;
  overflow-y: auto;
`;

const MessageInput = styled("input")`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const MessageForm = styled("form")`
  display: flex;
  justify-content: space-between;
`;

export default function Chat() {
  const [messages, setMessages] = createSignal<string[]>([]);
  const [input, setInput] = createSignal("");

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    setMessages([...messages(), input()]);
    setInput("");
  };

  return (
    <Wrapper>
      <MessageList>
        {messages().map((message, index) => (
          <p>{message}</p>
        ))}
      </MessageList>
      <MessageForm onSubmit={handleSubmit}>
        <MessageInput
          type="text"
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
        />
      </MessageForm>
    </Wrapper>
  );
}
