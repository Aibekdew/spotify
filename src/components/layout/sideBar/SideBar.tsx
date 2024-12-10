"use client";

import { usePlayListQuery } from "@/redux/api/playlist";
import scss from "./SideBar.module.scss";
import { useRouter } from "next/navigation";
import { BiLibrary } from "react-icons/bi";
import { LuPlus } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";

const SideBar = () => {
  const { data } = usePlayListQuery();
  const router = useRouter();
  const { openClose, setOpenClose } = usePlayerStore();
  return (
    <div
      className={scss.SideBar}
      style={{
        width: openClose ? "clamp(40px, 30vw, 90px)" : "",
      }}
    >
      <div className={scss.container}>
        <div className={scss.content}>
          {openClose ? (
            <div
              className={scss.library}
              onClick={() => setOpenClose(!openClose)}
            >
              <span>
                <BiLibrary />
              </span>
            </div>
          ) : null}
          <div className={scss.media}>
            {!openClose ? (
              <div className={scss.blocks}>
                <div className={scss.file}>
                  <span onClick={() => setOpenClose(!openClose)}>
                    <BiLibrary />
                  </span>
                  <h1>Моя медиатека</h1>
                </div>
                <div className={scss.strelka}>
                  <span>
                    <LuPlus />
                  </span>
                  <span>
                    <FaArrowRight />
                  </span>
                </div>
              </div>
            ) : null}
          </div>
          {data?.items.map((item) => (
            <div
              onClick={() => {
                router.push(`/play-list/${item.id}`);
              }}
              className={scss.playlist}
              key={item.id}
            >
              <img src={item.images[0].url} alt="picture" title={item.name} />
              <div className={scss.user_name}>
                {!openClose ? <h5>{item.name}</h5> : null}
                <h3>{!openClose ? item.owner.display_name : null}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
