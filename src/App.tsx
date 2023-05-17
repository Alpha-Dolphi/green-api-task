import { FunctionComponent, useState, createContext, useEffect } from "react";
import Chat from "./Components/Chat/Chat";
import Layout from "./Components/Layout/Layout";
import ChatT from "./data/chat";
import UserData from "./data/userData";

const UserDataContext = createContext<UserData>({
    idInstance: "",
    setIdInstance: () => {},
    apiTokenInstance: "",
    setApiTokenInstance: () => {},
    chatList: [],
    setChatList: () => {},
});

const App: FunctionComponent = () => {
  const [chatList, setChatList] = useState<ChatT[]>([]);
  const [apiTokenInstance, setApiTokenInstance] = useState<string>("");
  const [idInstance, setIdInstance] = useState<string>("");

  const userData: UserData = {
    idInstance,
    setIdInstance,
    apiTokenInstance,
    setApiTokenInstance,
    chatList,
    setChatList,
  };

  return (
    <UserDataContext.Provider value={userData}>
      <Layout>
        <Chat />
      </Layout>
    </UserDataContext.Provider>
  );
};

export default App;
export { UserDataContext };
