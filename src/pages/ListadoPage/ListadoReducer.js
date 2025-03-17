import { SELECT_SONG, SET_SONGS, SET_USER } from "./ListadoAction";

const initialState = {
  songs: [],
  selectedSong: null,
  userLogin: null,
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
        // Guardamos la cancion seleccionado
        selectedSong: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        userLogin: action.payload,
      };
    default:
      return state;
  }
};

export default songsReducer;
