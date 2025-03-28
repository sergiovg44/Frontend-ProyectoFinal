import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { setOptionFavorites, setSelectSong, setUser } from "../pages/ListadoPage/ListadoAction";
import { useDispatch, useSelector } from "react-redux";
import { setOptionUpdate } from "../pages/PerfilPage/PerfilAction";

const MenuOptionComponent = () => {
  const { userLogin } = useSelector((state) => state.songsReducer);


  const dispatch = useDispatch();

  let navigate = useNavigate();

  const goHome = () => {
    navigate("/");

    setTimeout(() => {
      dispatch(setSelectSong(null));
      dispatch(setOptionUpdate(false));
      dispatch(setOptionFavorites(false));
    }, 10);
  
  };
  const goListado = () => {
    navigate("/listado");
    setTimeout(() => {
      dispatch(setSelectSong(null));
      dispatch(setOptionUpdate(false));
      dispatch(setOptionFavorites(false));
    }, 10);
  };
  const goPerfil = () => {
    if (userLogin !== null) {
      navigate("/miprofile");
    } else {
      navigate("/login");
    }
    setTimeout(() => {
      dispatch(setSelectSong(null));
      dispatch(setOptionUpdate(false));
      dispatch(setOptionFavorites(false));
    }, 10);
  };
  const goCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("nombre");

    navigate("/");

    setTimeout(() => {
      dispatch(setUser(null))
      dispatch(setSelectSong(null));
      dispatch(setOptionUpdate(false));

    }, );
    setTimeout(() => {
      dispatch(setOptionFavorites(false));
    }, 10);
  };
  const goInicioSesion = () => {
    navigate("/login");
    setTimeout(() => {
      dispatch(setSelectSong(null));
      dispatch(setOptionUpdate(false));
      dispatch(setOptionFavorites(false));
    }, 10);
  };
  const goContacto = () => {
    navigate("/contacto");
    setTimeout(() => {
      dispatch(setSelectSong(null));
      dispatch(setOptionUpdate(false));
      dispatch(setOptionFavorites(false));
    }, 10);
  };


  return (
    <div>
      <div className="contenedor-botones">
        <div className="fila">
          <button onClick={goHome}>Home</button>

          <button onClick={goListado}>Canciones</button>

          <button onClick={goPerfil}>Mi perfil</button>
        </div>
        <div className="fila">
          {userLogin ? (
            <button onClick={goCerrarSesion}>Cerrar sesion</button>
          ) : (
            <button onClick={goInicioSesion}>Iniciar Sesion</button>
          )}

          <button onClick={goContacto}>Contacto</button>
        </div>
      </div>
    </div>
  );
};

export default MenuOptionComponent;
