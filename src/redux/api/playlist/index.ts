import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    playList: build.query<
      PLAYLIST.GetPlaylistResponse,
      PLAYLIST.GetPlaylistRequest
    >({
      query: () => ({
        url: "/me/playlists",
        method: "GET",
      }),
    }),

    getOnePlayList: build.query<
      PLAYLIST.GetOnePlaylistResponse,
      PLAYLIST.GetOnePlaylistRequest
    >({
      query: (playlist_id) => ({
        url: `/playlists/${playlist_id}`,
        method: "GET",
      }),
    }),

    getFeaturedPlaylist: build.query<
      PLAYLIST.GetFeaturedPlaylistResponse,
      PLAYLIST.GetFeaturedPlaylistRequest
    >({
      query: (limit_item) => ({
        url: `/browse/featured-playlists`,
        params: {
          limit: limit_item,
        },
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePlayListQuery,
  useGetOnePlayListQuery,
  useGetFeaturedPlaylistQuery,
} = api;
