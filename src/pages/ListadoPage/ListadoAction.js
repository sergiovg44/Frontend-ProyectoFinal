export const SET_SONGS = "SET_SONGS";
export const SELECT_SONG = 'SELECT_SONG'
export const SET_USER = "SET_USER"
export const SET_OPTION_FAVORITES = "SET_OPTION_FAVORITES";


export const setSongs = (listSongs) => {
    return {
        type: SET_SONGS,
        payload: listSongs, 
    };
};

export const setSelectSong = (song) => {
    return {
        type:  SELECT_SONG, 
        payload: song   
    }
}

export const setUser = (userData) => {
    return {
      type: SET_USER,
      payload: userData,
    };
  };

  export const setOptionFavorites = (value) => ({
    type: SET_OPTION_FAVORITES,
    payload: value, 
  });