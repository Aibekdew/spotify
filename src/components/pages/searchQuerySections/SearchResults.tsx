"use client";
import scss from "./SearchResults.module.scss";
import { useParams } from "next/navigation";
import { useSearchTracksQuery } from "@/redux/api/search";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { LuMusic4 } from "react-icons/lu";
import { IoPlaySharp } from "react-icons/io5";

const SearchResults = () => {
  const { searchQuery } = useParams();
  const decodeText = decodeURIComponent(String(searchQuery));
  const { data, isLoading } = useSearchTracksQuery(decodeText);
  const { activeUri, setActiveUri, setTractUris, setTractIndex } =
    usePlayerStore();
  console.log("🚀 ~ SearchResults ~ data:", data);

  const getTrackUris = async (index: number) => {
    const tracksUrisFilter = data?.tracks.items.map((item) => item.uri);
    setTractUris(tracksUrisFilter!);
    setTractIndex(index);
  };

  const filterActiveTrack = (uri: string) => {
    const activeTrack = data?.tracks.items.find((el) => el.uri === uri);
    setActiveUri(activeTrack?.uri!);
  };

  return (
    <section className={scss.SearchResults}>
      <div className="container">
        <div className={scss.content}>
          {isLoading ? (
            <>
              <h1>loading...</h1>
            </>
          ) : (
            <>
              <div className={scss.tracks}>
                <div className={scss.popular}>
                  <h1>Лучший результат</h1>
                  <div className={scss.popular_playlist}>
                    {data?.tracks.items
                      .map((item, index) => (
                        <div
                          key={index}
                          className={
                            activeUri === item.uri
                              ? `${scss.track} ${scss.active}`
                              : `${scss.track}`
                          }
                          onClick={() => {
                            filterActiveTrack(item.uri);
                            getTrackUris(index);
                          }}
                        >
                          <img src={item.album.images[0].url} alt="album" />
                          <h2>
                            {item.name}

                            {activeUri === item.uri ? (
                              <span className={scss.mus}>
                                <LuMusic4 />{" "}
                              </span>
                            ) : null}
                          </h2>
                          <div className={scss.text_playlist}>
                            <h6>Прейлист</h6>
                            <h5></h5>
                            <div className={scss.green}>
                              <span>
                                <IoPlaySharp />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                      .slice(0, 1)}
                  </div>
                </div>
                <div className={scss.treki}>
                  <h1>Треки</h1>
                  <div className={scss.treki_playlist}>
                    {data?.tracks.items
                      .map((item, index) => (
                        <div
                          key={index}
                          className={
                            activeUri === item.uri
                              ? `${scss.track} ${scss.active}`
                              : `${scss.track}`
                          }
                          onClick={() => {
                            filterActiveTrack(item.uri);
                            getTrackUris(index);
                          }}
                        >
                          <div className={scss.track_img}>
                            <img src={item.album.images[0].url} alt="album" />
                            <div className={scss.artist_name}>
                              <h2>
                                {item.name}

                                {activeUri === item.uri ? (
                                  <span className={scss.mus}>
                                    <LuMusic4 />{" "}
                                  </span>
                                ) : null}
                              </h2>
                              <h3>{item.album.artists[0].name}</h3>
                            </div>
                          </div>
                          <div className=""></div>
                        </div>
                      ))
                      .slice(0, 4)}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
