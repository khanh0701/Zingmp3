import actionTypes from "../actions/actionTypes";

const initState = {
  banner: [],
  chill: {},
  loveLife: {},
  remix: {},
  mood: {},
  artist: {},
  isLoading: false,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider").items ||
          null,
        chill:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          {},
        loveLife:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme2") ||
          {},
        remix:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme3") ||
          {},
        mood:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme4") ||
          {},
        artist:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme") ||
          {},
      };
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };

    default:
      return state;
  }
};

export default appReducer;
