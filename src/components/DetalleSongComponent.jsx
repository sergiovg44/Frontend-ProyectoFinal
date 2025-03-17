import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { transformDate, transformTime } from "../utils/utils";

const DetalleSongComponent = (props) => {
  const { iconHeart, handleFavorito } = props;
  const { songs, selectedSong } = useSelector((state) => state.songsReducer);
  const dispatch = useDispatch();

  const getBarColor = (popularity) => {
    if (popularity >= 80) return "#00ff00"; // verde
    if (popularity >= 50) return "#ffff00"; // amarillo
    return "#ff0000"; // rojo
  };

  return (
    <div className="card-detail">
      <div>
        <img
          src={iconHeart(selectedSong)}
          alt="Añadir a favoritos"
          className="favorite-icon"
          onClick={(e) => {
            e.stopPropagation(); 
            handleFavorito(selectedSong._id);
          }}
        />
      </div>
      <div className="box-img">
        <img
          src={selectedSong.images_mediana}
          alt="imagen del albun"
          className="img-detail"
        />
      </div>
      <div className="song-info">
        <h2 className="title-detail">Detalle de la cancion</h2>
        <div className="text-detail">
          <div>
            <span className="name-song">{selectedSong.song_name} </span>
          </div>
          <span>{transformTime(selectedSong.duration_ms)}</span>
          <div className="detail-artist">
            {selectedSong.artist_name.map((e, idx) => (
              <span key={idx} className="">
                {e}{" "}
              </span>
            ))}
          </div>
          <span>{transformDate(selectedSong.release_date)}</span>
        </div>
      </div>
      <div className="popularity-wrapper">
        <span>Popularidad: {selectedSong.popularity}</span>
        <div className="popularity-bar">
          <div
            className="bar-fill"
            style={{
              width: `${selectedSong.popularity}%`,
              backgroundColor: getBarColor(selectedSong.popularity),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DetalleSongComponent;
