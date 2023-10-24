import appReducer from "./appReducers";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import musicReducer from "./musicReducers";

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const musicConfig = {
  ...commonConfig,
  key: "music",
  whilelist: ["curSongId"],
};

const rootReducer = combineReducers({
  app: appReducer,
  music: persistReducer(musicConfig, musicReducer),
});
export default rootReducer;
