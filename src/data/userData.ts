import ChatT from "./chat";

interface UserData {
  idInstance: string;
  setIdInstance: React.Dispatch<React.SetStateAction<string>>;
  apiTokenInstance: string;
  setApiTokenInstance: React.Dispatch<React.SetStateAction<string>>;
  chatList: ChatT[];
  setChatList: React.Dispatch<React.SetStateAction<ChatT[]>>;
}

export default UserData;
