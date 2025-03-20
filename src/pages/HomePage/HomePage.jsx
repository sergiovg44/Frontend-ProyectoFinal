import React, { useEffect, useState } from "react";
import MenuOptionComponent from "../../components/MenuOptionComponent";
import { getUserId } from "../../core/services/ProductFetch";
import { setUser } from "../ListadoPage/ListadoAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  loadSongs,
  loadUser,
  verificarTokenPeriodicamente,
} from "../../utils/utils";

const HomePage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { songs } = useSelector((state) => state.songsReducer);
  const [randomSongs, setRandomSongs] = useState([]);

  const obtenerCancionesAleatorias = () => {
    if (songs.length > 0) {
      const copiaCanciones = [...songs];
      const cancionesAleatorias = copiaCanciones
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setRandomSongs(cancionesAleatorias);
    }
  };
  useEffect(() => {
    const intervalId = verificarTokenPeriodicamente(dispatch, navigate);
    return () => clearInterval(intervalId);
  }, [dispatch, navigate]);

  useEffect(() => {
    if (songs.length > 0 && randomSongs.length === 0) {
      obtenerCancionesAleatorias();
      console.log("useEffect de songs");
    }
    }, [songs]);

  useEffect(() => {
    loadSongs(dispatch);
    loadUser(dispatch, navigate, setUser);
    setRandomSongs([])
  }, []);
  return (
    <div className="home-container">
      <div>
        <MenuOptionComponent />
      </div>
      <div className="overlay-content">
        <h2 className="hero-title">
          Descubre los detalles detrás de cada canción
        </h2>
        <button
              className="explore-btn"
              onClick={() => navigate("/listado")}
            >
              Explorar canciones
            </button>

        {randomSongs.length > 0 ? (
          <>
            <div className="featured-songs">
              {randomSongs.map((song, index) => (
                <div key={index} className="song-mini-card">
                  <img
                    src={song.images_mediana}
                    alt="Portada Album"
                    className="mini-card-image"
                    onClick={() => navigate("/listado")}
                  />
                  <div className="mini-card-text">
                    <span>{song.song_name}</span>
                    <span>{song.artist_name}</span>
                  </div>
                </div>
              ))}
            </div>
         
          </>
        ) : (
          <p>Cargando canciones...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
