import type { PropsWithChildren } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="d-flex p-3" style={{backgroundColor: '#01020E'}}>
        <SideBar />
        <div className="d-flex flex-column ms-3 align-items-end" style={{width: '100%'}}>
          <Header />
          <main className="container mt-3">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
