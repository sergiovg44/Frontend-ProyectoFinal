import React, { useEffect } from "react";
import MenuOptionComponent from "../../components/MenuOptionComponent";
import { getSongs,  toggleFavourite } from "../../core/services/ProductFetch";
import { useDispatch, useSelector } from "react-redux";
import { setSongs, setUser } from "./ListadoAction";
import ListaCancionesComponent from "../../components/ListaCancionesComponent";
import DetalleSongComponent from "../../components/DetalleSongComponent";
import heartFilled from "../../../src/assets/corazon-relleno.png";
import heartOutline from "../../../src/assets/corazon-sin-relleno.png";
import { useNavigate } from "react-router";

const ListadoPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { songs, selectedSong, userLogin } = useSelector((state) => state.songsReducer);

  const loadSongs = async () => {
    const songs = await getSongs();
    console.log(songs);
    dispatch(setSongs(songs));
  };


  const handleFavorito = async (idSong) => {
    if (!userLogin) {

      alert("Debes iniciar Sesion para añadir a favoritos")
      return 
    }
  
    const isFavourite = userLogin.favoritas.includes(idSong);
    const method = isFavourite ? "DELETE" : "POST";
    const response = await toggleFavourite(idSong, method, dispatch, navigate);
  
    if (response.success) {
      dispatch(setUser(response.data)) // Actualiza usuario en Redux
    }
  };

  const iconHeart = (song) => {
    if (userLogin) {
      const isFavourite = userLogin.favoritas.includes(song._id);
      return isFavourite ? heartFilled : heartOutline;
    }
    return heartOutline;
  };

  useEffect(() => {
    // console.log(selectedSong);
    console.log(userLogin);
  }, [userLogin]);

  useEffect(() => {
    loadSongs();

  }, []);

  return (
    <div>
      <div>
        <MenuOptionComponent />
      </div>
      <div className="contenedor-pages">
        {!selectedSong ? (
          <ListaCancionesComponent
          iconHeart={iconHeart}
            handleFavorito={handleFavorito}
          />
        ) : (
          <DetalleSongComponent
          iconHeart={iconHeart}
          handleFavorito={handleFavorito}
          />
        )}
      </div>
    </div>
  );
};

export default ListadoPage;
