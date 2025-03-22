import { SELECT_SONG, SET_OPTION_FAVORITES, SET_SONGS, SET_USER } from "./ListadoAction";

const initialState = {
  songs: [],
  selectedSong: null,
  userLogin: null,
  mostrarFavoritos: false,
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SONGS:
      return {
        ...state,
        songs: action.payload,
      };

    case SELECT_SONG:
      return {
        ...state,

        selectedSong: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        userLogin: action.payload,
      };
    case SET_OPTION_FAVORITES:
      return { ...state, mostrarFavoritos: action.payload };

    default:
      return state;
  }
};

export default songsReducer;
