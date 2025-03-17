export const SET_SONGS = "SET_SONGS";
export const SELECT_SONG = 'SELECT_SONG'



export const setSongs = (listSongs) => {
    return {
        type: SET_SONGS,
        payload: listSongs, 
    };
};

export const setSelectSong = (donut) => {
    return {
        type:  SELECT_SONG, 
        payload: donut   
    }
}