import actionTypes from "../actions/actionTypes";

const initState = {
  curSongId: null,
  isPlaying: false,
  atAlbum: false,
  songs: null,
};

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid || null,
      };
    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case actionTypes.SONGS:
      return {
        ...state,
        songs: action.songs || null,
      };
    case actionTypes.SET_ALBUM:
      return {
        ...state,
        atAlbum: action.flag,
      };

    default:
      return state;
  }
};

export default musicReducer;
