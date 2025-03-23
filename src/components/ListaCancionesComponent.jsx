import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOptionFavorites,
  setSelectSong,
} from "../pages/ListadoPage/ListadoAction";
import { getSongId } from "../core/services/ProductFetch";

const ListaCancionesComponent = (props) => {
  const { iconHeart, handleFavorito } = props;
  const { songs, userLogin, mostrarFavoritos } = useSelector(
    (state) => state.songsReducer
  );
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const songtSelect = async (idSong) => {
    if (idSong) {
      const song = await getSongId(idSong);
      dispatch(setSelectSong(song));
    }
  };

  const obtenerCancionesFiltradas = () => {
    if (mostrarFavoritos) {
      return songs.filter((song) => userLogin.favoritas.includes(song._id));
    }
  
    if (search.trim()) {
      const formatSearch = search.toLowerCase();
      const cancionesFiltradas = songs.filter((song) => {
        const coincidenciaNombre = song.song_name.toLowerCase().includes(formatSearch);
        if (coincidenciaNombre) {
          return true; 
        }
        const coincidenciaArtista = song.artist_name.join(" ").toLowerCase().includes(formatSearch);
        if (coincidenciaArtista) {
          return true; 
        }
        return false; 
      });
      return cancionesFiltradas;
    }
    return songs;
  };
  

  const cancionesFiltradas = obtenerCancionesFiltradas();

  return (
    <div>
      <h2 className="hero-title">Listado de canciones</h2>
      <div className="conten-search">
        {!userLogin ? (
          ""
        ) : !mostrarFavoritos ? (
          <button
            className="edit-button"
            onClick={() => dispatch(setOptionFavorites(true))}
          >
            Favoritos
          </button>
        ) : (
          <button
            className="edit-button"
            onClick={() => dispatch(setOptionFavorites(false))}
          >
            Listado
          </button>
        )}
        {
          !mostrarFavoritos?(
            <input
              type="text"
              className="input search "
              placeholder="Buscar canciones..."
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
            />
        
          ):(
            ""
          )
        }
      </div>
      <div className="grip">
        {cancionesFiltradas && cancionesFiltradas.length > 0 ? (
          cancionesFiltradas.map((p, idx) => (
            <div
              key={idx}
              className="card-songs"
              onClick={() => songtSelect(p._id)}
            >
              <div>
                <img
                  src={iconHeart(p)}
                  alt="Añadir a favoritos"
                  className="favorite-icon"
                  onClick={(e) => {
                    handleFavorito(p._id);
                    e.stopPropagation();
                  }}
                />
              </div>
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
        ) : !mostrarFavoritos ? (
          search !== ""?(
            <span className="text-favorite">No se encuentran coincidencias</span>
            
          ):
          <span className="text-favorite">Loading...</span>
        ) : (
          <span className="text-favorite">No hay favoritos en la lista</span>
        )}
      </div>
    </div>
  );
};

export default ListaCancionesComponent;
