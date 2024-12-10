"use client";
import { useGetMeQuery } from "@/redux/api/me";
import scss from "./Header.module.scss";
import Link from "next/link";
import { FaSpotify } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoFileTrayFullOutline } from "react-icons/io5";

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import SearchTracks from "@/components/shared/SearchTracks";
import { BiLibrary } from "react-icons/bi";

const Header = () => {
  const { data: session } = useGetMeQuery();
  const [close, setClose] = useState<string>("");
  const [user, setUser] = useState<boolean>(false);

  const handleLogin = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/login`,
      "_self"
    );
  };

  const handleLogout = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/logout`,
      "_self"
    );
  };

  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>
            <Link href={"/"}>
              <FaSpotify />
            </Link>
          </div>
          <div className={scss.block}>
            <Link href={"/"} className={scss.home}>
              <BiLibrary />
            </Link>
            <div className={scss.search}>
              <a className={scss.sear}>{<FiSearch />}</a>
              <SearchTracks />
              {!close.length ? (
                <div className={scss.search_bl}>
                  <div className={scss.slesh}></div>
                  <div className={scss.file}>
                    <a>
                      <IoFileTrayFullOutline />
                    </a>
                  </div>
                </div>
              ) : (
                <a onClick={() => setClose("")} className={scss.close}>
                  <IoCloseOutline />
                </a>
              )}
            </div>
          </div>
          <div className={scss.bellAuth}>
            <a className={scss.bell}>
              <GoBell />
            </a>
            <div className={scss.auth}>
              {session ? (
                <>
                  <div onClick={() => setUser(true)} className={scss.user}>
                    <h5>{session.display_name.slice(0, 1).toUpperCase()}</h5>
                  </div>

                  {user ? (
                    <div onClick={() => setUser(false)} className={scss.logout}>
                      <button onClick={handleLogout}>LogOut</button>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <button className={scss.login} onClick={handleLogin}>
                    LogIn
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
