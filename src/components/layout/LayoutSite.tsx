import { FC, ReactNode } from "react";
import scss from "./LayoutSite.module.scss";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import SideBar from "./sideBar/SideBar";

interface LayoutSiteProps {
  children: ReactNode;
}

const LayoutSite: FC<LayoutSiteProps> = ({ children }) => {
  return (
    <div className={scss.LayoutSite}>
      <Header />
      <div className={scss.home}>
        <div className={scss.sideBar}>
          <SideBar />
        </div>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutSite;
