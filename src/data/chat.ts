interface Message {
  content: string;
  id: string | number;
  isUserMessage: boolean;
  sendTime: string;
}

type Chat = {
  chatId: string;
  active: boolean;
  messages: Message[];
  inputMessage: string;
}

export default Chat;