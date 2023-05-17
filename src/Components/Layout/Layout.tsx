import { FunctionComponent } from "react";
import Sidebar from "../Sidebar/Sidebar";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <main className="flex">
      <Sidebar />
      <div className="bg-blue-grey-700 w-full">{children}</div>
    </main>
  );
};

export default Layout;
