"use client";

import { useGetOnePlayListQuery } from "@/redux/api/playlist";
import scss from "./Playlist.module.scss";
import { useParams, useRouter } from "next/navigation";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { LuMusic4 } from "react-icons/lu";
import { WiTime2 } from "react-icons/wi";
import moment from "moment";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoPlaySharp } from "react-icons/io5";

// @ts-ignore
import { ColorExtractor } from "react-color-extractor";
import { useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoMdMenu } from "react-icons/io";

const PlayList = () => {
  const { playlistQuery } = useParams();
  const router = useRouter();
  const [bgColor, setBgColor] = useState("#ffffff");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading } = useGetOnePlayListQuery(String(playlistQuery));
  const { activeUri, setActiveUri, setTractUris, setTractIndex } =
    usePlayerStore();

  const getTrackUris = async (index: number) => {
    const tracksUrisFilter = data?.tracks.items.map((item) => item.track.uri);
    setTractUris(tracksUrisFilter!);
    setTractIndex(index);
  };

  const filterActiveTrack = (uri: string) => {
    const activeTrack = data?.tracks.items.find((el) => el.track.uri === uri);
    setActiveUri(activeTrack?.track.uri!);
  };

  const handleColors = (colors: string[]) => {
    if (colors.length > 0) {
      setBgColor(colors[0]);
    }
  };

  return (
    <div
      className={scss.PlayList}
      style={{
        cursor: isLoading ? "wait" : "default",
      }}
    >
      <div className="container">
        <div
          style={{
            background: `linear-gradient( ${bgColor}, rgba(79,79,89,1) 65%, rgba(55,58,59,0) 100%)`,
            padding: "20px",
          }}
          className={scss.content}
        >
          <div className={scss.user}>
            <div className={scss.user_img}>
              <ColorExtractor getColors={handleColors}>
                <img
                  src={data?.images[0].url}
                  alt="Cover"
                  style={{ height: "auto" }}
                  crossOrigin="anonymous"
                />
              </ColorExtractor>
            </div>
            <div className={scss.text}>
              <h5>Плейлист</h5>
              <h1>{data?.name}</h1>
              <h4>
                {data?.owner.display_name}
                {data?.tracks.items.length} {}
              </h4>
            </div>
          </div>
          <div className={scss.play_block}>
            <div className={scss.video}>
              <div className={scss.green}>
                <span>
                  <IoPlaySharp />
                </span>
              </div>
              <span
                onClick={() => {
                  setOpenModal(!openModal), setMenuOpen(false);
                }}
                className={scss.three}
              >
                <TfiMoreAlt />
                {openModal ? (
                  <div className={scss.menu}>
                    <h6>Формат библиотеки</h6>
                    <div
                      onClick={() => {
                        router.push(`/`);
                      }}
                      className={scss.img_none}
                    >
                      <span>
                        <IoMdMenu />
                      </span>
                      <h5>Компактный</h5>
                    </div>
                    <div className={scss.img_block}>
                      <span>
                        <TfiMenuAlt />
                      </span>
                      <h5>Список</h5>
                    </div>
                  </div>
                ) : null}
              </span>
            </div>
            <div
              onClick={() => {
                setMenuOpen(!menuOpen), setOpenModal(false);
              }}
              className={scss.spisok_play}
            >
              <h6>Список</h6>
              <span>
                <TfiMenuAlt />
                {menuOpen ? (
                  <div className={scss.menu}>
                    <h6>Формат библиотеки</h6>
                    <div
                      onClick={() => {
                        router.push(`/`);
                      }}
                      className={scss.img_none}
                    >
                      <span>
                        <IoMdMenu />
                      </span>
                      <h5>Компактный</h5>
                    </div>
                    <div className={scss.img_block}>
                      <span>
                        <TfiMenuAlt />
                      </span>
                      <h5>Список</h5>
                    </div>
                  </div>
                ) : null}
              </span>
            </div>

            {menuOpen || openModal ? (
              <div
                onClick={() => {
                  setMenuOpen(false), setOpenModal(false);
                }}
                className={scss.bg_menu}
              ></div>
            ) : null}
          </div>
          <div className={scss.play}>
            <div className={scss.nazvania}>
              <div className={scss.naz}>
                <span>#</span>
                <h4>Название</h4>
              </div>
              <h4 className={scss.ndata}>Альбом</h4>
              <h3>Дата добавления</h3>
              <span className={scss.time}>
                <WiTime2 />
              </span>
            </div>
            <div className={scss.width}></div>
            <div className={scss.music}>
              {data?.tracks.items.map((item, index) => (
                <div
                  key={index}
                  className={
                    activeUri === item.track.uri
                      ? `${scss.track} ${scss.active}`
                      : `${scss.track}`
                  }
                  onClick={() => {
                    filterActiveTrack(item.track.uri);
                    getTrackUris(index);
                  }}
                >
                  <div className={scss.nomer}>
                    <span className={scss.index}>{index + 1}</span>
                    <span className={scss.stop}>
                      <IoPlaySharp />
                    </span>
                    <img src={item.track.album.images[0].url} alt="album" />

                    <div className={scss.name_artist}>
                      <h2>
                        {item.track.name}
                        {activeUri === item.track.uri ? (
                          <span className={scss.mus}>
                            <LuMusic4 />{" "}
                          </span>
                        ) : null}
                      </h2>
                      <h3>{item.track.artists[0].name}</h3>
                    </div>
                  </div>
                  <h2 className={scss.music_name}>{item.track.name}</h2>
                  <div className={scss.data}>
                    <h3>3 day</h3>
                  </div>
                  <h4 className={scss.hours}>
                    {moment.utc(item.track.duration_ms).format("m:ss")}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayList;
