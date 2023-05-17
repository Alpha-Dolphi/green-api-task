import {FunctionComponent, useState, useContext, useEffect} from "react";
import { AiFillPlusCircle } from 'react-icons/ai';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { UserDataContext } from "../../App";


const NewChatForm: FunctionComponent = () => {
    const { chatList, setChatList, apiTokenInstance, idInstance } = useContext(UserDataContext);
    const [value, setValue] = useState("+79776475122")

    const handleFormSubmit = (event : React.FormEvent) => {
        event.preventDefault();

        if (chatList.find(({chatId}) => chatId === value.substring(1) + "@c.us")) {
            setValue("");
            return;
        }

        const chatId = value.substring(1) + "@c.us"

        setChatList([...chatList, {
            chatId,
            active: false,
            messages: [],
            inputMessage: "",
        }])

    }


	return <form className="flex justify-between px-4 py-4" onSubmit={handleFormSubmit}>
        <PhoneInput
        required
        defaultCountry="RU"
        className="phone-input"
        placeholder="Enter a phone number"
        value={value}
        onChange={(val: any) => setValue(val)}
        />
        <button><AiFillPlusCircle className="text-[1.9rem] cursor-pointer text-blue-grey-200 hover:text-greeny transition duration-100 mr-[-0.1rem]"/></button>
	</form>
};

export default NewChatForm;