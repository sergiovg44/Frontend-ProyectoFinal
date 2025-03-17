import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectSong } from "../pages/ListadoPage/ListadoAction";
import { getSongId } from "../core/services/ProductFetch";

const ListaCancionesComponent = () => {
  const { songs, selectedSong  } = useSelector((state) => state.songsReducer);
  const dispatch = useDispatch();

  const songtSelect = async (idSong) => {
    if (idSong) {
      const song = await getSongId(idSong);
      dispatch(setSelectSong(song));
    } 
  };

  return (
    <div>
      <h2 className="title">Listado de canciones</h2>
      <div className="grip">
        {songs && songs.length > 0 ? (
          songs.map((p, idx) => (
            <div key={idx} className="card-songs" onClick={() => songtSelect(p._id)} >
              <img
                src={p.images_mediana}
                className="imagen-listado"
                alt="imagen album"
              />
              <div className="text-card">
                <div>
                  <span>{p.song_name}</span>
                </div>
                <div>
                  <div className="artist-name">
                    {p.artist_name.map((e, idx) => (
                      <span key={idx} className="">
                        {e}{" "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ListaCancionesComponent;
