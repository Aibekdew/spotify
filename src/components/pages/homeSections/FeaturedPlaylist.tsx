"use client";
import { useGetFeaturedPlaylistQuery } from "@/redux/api/playlist";
import scss from "./FeaturedPlaylist.module.scss";
import { useRouter } from "next/navigation";
import { IoPlaySharp } from "react-icons/io5";
import { useEffect, useState } from "react";

const FeaturedPlaylist = () => {
  const { data } = useGetFeaturedPlaylistQuery(6);
  const router = useRouter();
  console.log(data, "data");

  return (
    <div className={scss.FeaturedPlaylist}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.playText}>
            <h3 className={scss.name_playlist}>{data?.message}</h3>
            <h2>Показать все</h2>
          </div>
          <div className={scss.newPlaylist}>
            {data?.playlists?.items.map((playlist) => (
              <div
                onClick={() => router.push(`/play-list/${playlist.id}`)}
                key={playlist.id}
                className={scss.playlist}
              >
                <img
                  className={scss.playlistImg}
                  src={playlist.images[0].url}
                  alt={playlist.name}
                />
                <h4>{playlist.name}</h4>
                <div className={scss.green}>
                  <span>
                    <IoPlaySharp />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPlaylist;
