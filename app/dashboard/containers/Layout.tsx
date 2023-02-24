import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "./Main";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>{children}</Main>
      </div>
    </div>
  );
}
