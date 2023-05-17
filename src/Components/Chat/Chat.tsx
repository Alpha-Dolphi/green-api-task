import { FunctionComponent, useContext, useState, useEffect } from "react";
import { UserDataContext } from "../../App";
import axios from 'axios';
import { IoMdSend } from 'react-icons/io';
import { getCurrentTime } from "../../utilities/getCurrentTime";
import { getMessages } from "./getMessages";

const Chat: FunctionComponent = () => {
  const { chatList, setChatList, idInstance, apiTokenInstance } = useContext(UserDataContext);
  const activeChat = chatList.find(({ active, chatId }) => active);
  const [inputValue, setInputValue] = useState("");
  const [length, setLength] = useState(0);
  const [isEffectRunning, setIsEffectRunning] = useState(false);

  useEffect(() => {
    if (chatList.length && !isEffectRunning) {
      setIsEffectRunning(true);

      (async () => {
        await getMessages(idInstance, apiTokenInstance, chatList, setChatList);
        setIsEffectRunning(false);
      })();

      const interval = setInterval(() => {
        (async () => {
          await getMessages(idInstance, apiTokenInstance, chatList, setChatList);
          setIsEffectRunning(false);
        })();
      }, 6000);

      return function () {
        clearInterval(interval);
      };
    }
  }, [chatList, isEffectRunning]);

  const handleFormSubmit = async (event: React.FormEvent) => {
	event.preventDefault();

	const url = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
	const chatId = activeChat?.chatId;
	const message = inputValue;

	try {
	  await axios.post(url, {
		chatId,
		message
	  });
	} catch (error) {
	  console.error(error);
	}

	setChatList([
		...chatList.map((ch, ind) => ch.chatId === chatId ? {
			...chatList[ind],
			messages: [
				...chatList[ind].messages,
				{
					content: message,
  					id: Math.floor(Math.random() * 10000) + 1,
  					isUserMessage: true,
					sendTime: getCurrentTime(),
				},
			]
		} : {
			...chatList[ind],
		}),
	])
	setInputValue("");
  };


  return (
    activeChat?.chatId ? <section className="grid h-full content-end" >
		<div className="flex flex-col p-4 gap-4 smth max-h-[calc(100vh-64px)] overflow-y-auto">
  {activeChat.messages.map((message) => (
    <div key={message.id} className={`text-blue-grey-100 w-fit h-fit py-2 pl-3 rounded-[0.5rem] relative pr-5 pb-4 ${message.isUserMessage ? "bg-[#005c4b]  ml-auto" : "bg-blue-grey-500"}`}>
      <span>
        {message.content}
      </span>
      <span className={`absolute bottom-0 right-[0.4rem] text-[0.8rem] ${message.isUserMessage ? "text-[#669d93]" : "text-[#7a8185]"}`}>
        {message.sendTime}
      </span>
    </div>
  ))}
</div>

	  <form className="flex gap-4 px-4 py-[0.7rem] bg-blue-grey-500 h-fit" onSubmit={handleFormSubmit} >
	  	<input
        	type="text"
			className="h-10 w-full rounded-md px-4 outline-none bg-blue-grey-400 text-[#d1d7db]"
        	value={inputValue}
        	onChange={(e) => setInputValue(e.target.value)}
      	/>
      	<button type="submit"><IoMdSend className="cursor-pointer text-[#7c8c95] text-[2rem]"/></button>
	  </form>
    </section> : <section></section>
  );
};

export default Chat;
