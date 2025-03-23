import React, { useEffect } from "react";
import MenuOptionComponent from "../../components/MenuOptionComponent";
import { toggleFavourite } from "../../core/services/ProductFetch";
import { useDispatch, useSelector } from "react-redux";
import {  setUser } from "./ListadoAction";
import ListaCancionesComponent from "../../components/ListaCancionesComponent";
import DetalleSongComponent from "../../components/DetalleSongComponent";
import heartFilled from "../../../src/assets/corazon-relleno.png";
import heartOutline from "../../../src/assets/corazon-sin-relleno.svg";
import { useNavigate } from "react-router";
import {
  loadSongs,
  loadUser,
  verificarTokenPeriodicamente,
} from "../../utils/utils";
import { toast } from "react-toastify";

const ListadoPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { selectedSong, userLogin } = useSelector(
    (state) => state.songsReducer
  );

  const handleFavorito = async (idSong) => {
    if (!userLogin) {
      toast.info("Debes iniciar Sesion para añadir a favoritos");
      return;
    }

    const isFavourite = userLogin.favoritas.includes(idSong);
    const method = isFavourite ? "DELETE" : "POST";
    const response = await toggleFavourite(idSong, method, dispatch, navigate);

    if (response.success) {
      dispatch(setUser(response.data)); 
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
    const intervalId = verificarTokenPeriodicamente(dispatch, navigate);

    return () => clearInterval(intervalId);
  }, [dispatch, navigate]);

  useEffect(() => {
    loadSongs(dispatch);
    loadUser(dispatch, navigate, setUser);
  }, []);

  return (
    <div className="container">
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
          <div className="content-center">
            <DetalleSongComponent
              iconHeart={iconHeart}
              handleFavorito={handleFavorito}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListadoPage;
