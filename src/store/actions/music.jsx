import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const setCurSongId = (sid) => ({
  type: actionTypes.SET_CUR_SONG_ID,
  sid,
});

export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
});

export const playAlbum = (flag) => ({
  type: actionTypes.SET_ALBUM,
  flag,
});
export const setPlayList = (songs) => ({
  type: actionTypes.SONGS,
  songs,
});

// export const fetchDetailPlayList = (pid) => async (dispatch) => {
//   try {
//     const response = await apis.apiGetDetailPlayList(pid);
//     if (response?.data.err === 0) {
//       dispatch({
//         type: actionTypes.SONGS,
//         songs: response.data?.data?.items,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionTypes.SONGS,
//       songs: null,
//     });
//   }
// };
