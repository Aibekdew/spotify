"use client";
import { useGetAlbumsPlaylistQuery } from "@/redux/api/albums";
import scss from "./AlbumsPlaylist.module.scss";

const AlbumsPlaylist = () => {
  const { data } = useGetAlbumsPlaylistQuery();
  console.log(data, "albums");

  return (
    <section className={scss.AlbumsPlaylist}>
      <div className="container">
        <div className={scss.content}></div>
      </div>
    </section>
  );
};

export default AlbumsPlaylist;
