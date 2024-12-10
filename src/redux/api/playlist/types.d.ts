namespace PLAYLIST {
  type GetPlaylistResponse = IPlaylist;
  type GetPlaylistRequest = void;

  type GetOnePlaylistResponse = IOnePlaylist;
  type GetOnePlaylistRequest = string;

  type GetFeaturedPlaylistResponse = IFeaturedPlaylist;
  type GetFeaturedPlaylistRequest = number | string;
}
