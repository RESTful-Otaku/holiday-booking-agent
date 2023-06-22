import { createSignal, onCleanup } from "solid-js";
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

const Message = styled("p")<{ from: "user" | "bot" }>`
  max-width: 60%;
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  position: relative;
  clear: both;
  line-height: 1.5;
  transition: transform 0.3s ease;
  color: white;
  background-color: ${(props) => (props.from === "bot" ? "#0b93f6" : "#3f3f3f")};
  align-self: ${(props) => (props.from === "bot" ? "flex-start" : "flex-end")};
  float: ${(props) => (props.from === "bot" ? "left" : "right")};
`;

function getBotResponse(message: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`You said: "${message}"`);
    }, 1000);
  });
}

export default function Chat() {
  const [messages, setMessages] = createSignal<Array<{ text: string; from: "user" | "bot" }>>([]);
  const [input, setInput] = createSignal("");
  const [isBotTyping, setIsBotTyping] = createSignal(false);

  onCleanup(() => {
    const chat = document.getElementById("chat");
    if (chat) {
      chat.scrollTop = chat.scrollHeight;
    }
  });  

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const userMessage = { text: input(), from: "user" };
    setMessages([...messages(), { text: input(), from: "user" }]);
    setInput("");
  
    setIsBotTyping(true);
  getBotResponse(userMessage.text).then((botResponse) => {
    setIsBotTyping(false);
    setMessages((prevMessages) => [...prevMessages, { text: botResponse, from: "bot" }]);
  });
};

  
  return (
    <Wrapper>
      <MessageList id="chat">
        {messages().map((message, index) => (
          <Message from={message.from}>
            {message.text}
          </Message>
        ))}
        {isBotTyping() && <p>Bot is typing...</p>}
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

