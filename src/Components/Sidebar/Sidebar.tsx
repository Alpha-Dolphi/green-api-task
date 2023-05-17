import { useState, FunctionComponent } from "react";
import ChatList from "../ChatList/ChatList";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import Authorization from "../Authorization/Authorization";
import NewChatForm from "../NewChatForm/NewChatForm";

const Sidebar: FunctionComponent = () => {
  const [showChatList, setShowChatList] = useState<boolean>(false);
  const [showAuthorization, setShowAuthorization] = useState<boolean>(true);

  const handleShowChatList = () => {
    setShowChatList(true);
    setShowAuthorization(false);
  };

  const handleShowAuthorization = () => {
    setShowAuthorization(true);
    setShowChatList(false);
  };

  return (
    <section className="h-screen bg-blue-grey-600 min-w-[20rem] flex flex-col border-r-[0.03rem] border-blue-grey-400">
      <HeaderMenu
        handleShowChatList={handleShowChatList}
        handleShowAuthorization={handleShowAuthorization}
      />
      {showChatList && (
        <section className="h-full flex flex-col ">
          <NewChatForm />
          <ChatList />
        </section>
      )}
      {showAuthorization && <Authorization />}
    </section>
  );
};

export default Sidebar;
