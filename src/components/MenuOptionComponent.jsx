import React from "react";
import { useLocation, useNavigate } from "react-router";
import { setSelectSong, setUser } from "../pages/ListadoPage/ListadoAction";
import { useDispatch, useSelector } from "react-redux";
import { setOptionUpdate } from "../pages/PerfilPage/PerfilAction";

const MenuOptionComponent = () => {
  const { userLogin } = useSelector((state) => state.songsReducer);

  let location = useLocation();
  const dispatch = useDispatch();

  const nombre = localStorage.getItem("nombre");
  const { pathname } = location;
  let navigate = useNavigate();

  const goHome = () => {
    navigate("/");

    setTimeout(() => dispatch(setSelectSong(null)), 0);
    setTimeout(() => dispatch(setOptionUpdate(false)), 0);
  };
  const goListado = () => {
    navigate("/listado");
    setTimeout(() => dispatch(setSelectSong(null)), 0);
    setTimeout(() => dispatch(setOptionUpdate(false)), 0);
  };
  const goPerfil = () => {
    if (userLogin !== null) {
      navigate("/miprofile");
    } else {
      navigate("/login");
    }
    setTimeout(() => dispatch(setSelectSong(null)), 0);
    setTimeout(() => dispatch(setOptionUpdate(false)), 0);
  };
  const goCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("nombre");

    navigate("/");
    setTimeout(() => dispatch(setSelectSong(null)), 0);
    setTimeout(() => dispatch(setUser(null)), 0);
    setTimeout(() => dispatch(setOptionUpdate(false)), 0);
  };
  const goInicioSesion = () => {
    navigate("/login");
    setTimeout(() => dispatch(setSelectSong(null)), 0);
    setTimeout(() => dispatch(setOptionUpdate(false)), 0);
  };
  const goContacto = () => {
    navigate("/contacto");
    setTimeout(() => dispatch(setSelectSong(null)), 0);
    setTimeout(() => dispatch(setOptionUpdate(false)), 0);
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
          {userLogin !== null ? (
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
