import { FunctionComponent } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsChatLeftTextFill } from "react-icons/bs";

interface HeaderMenuProps {
  handleShowChatList: () => void;
  handleShowAuthorization: () => void;
}

const HeaderMenu: FunctionComponent<HeaderMenuProps> = ({
  handleShowChatList,
  handleShowAuthorization,
}) => {
  return (
    <header className="bg-blue-grey-500 h-[3rem] w-full px-4 flex items-center justify-between">
      <FaUserCircle
        className="header-icon"
        onClick={() => handleShowAuthorization()}
      />
      <BsChatLeftTextFill
        className="header-icon"
        onClick={() => handleShowChatList()}
      />
    </header>
  );
};

export default HeaderMenu;