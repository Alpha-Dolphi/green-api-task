import {FunctionComponent, useContext} from "react";
import { UserDataContext } from "../../App";

const ChatList: FunctionComponent = () => {
	const { chatList, setChatList } = useContext(UserDataContext);

	const handleChatClick = (index : number) => {
		setChatList([
			...chatList.map((_, ind) => ind === index ? {
				...chatList[index],
				active: true,
			} : {
				...chatList[ind],
				active: false,
			}),
		])

	}

	return <section className="h-full w-full flex flex-col items-center">
		{chatList.map((chat, index) => <div
		key={chat.chatId}
		className={`flex items-center border-b-[0.03rem]
		 border-blue-grey-400 text-blue-grey-100 cursor-pointer
		 first:border-t-[0.03rem]
		 transition duration-100
		 ${chat.active ? 'bg-blue-grey-400' : 'hover:bg-blue-grey-500'}
		 w-full
		 px-4 h-fit py-[0.7rem]
		 `}
		 onClick={() => handleChatClick(index)}>{chat.chatId}</div>)}
	</section>
};

export default ChatList;