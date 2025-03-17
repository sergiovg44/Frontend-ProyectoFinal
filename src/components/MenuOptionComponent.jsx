import React from "react";
import { useLocation, useNavigate } from "react-router";
import { setSelectSong } from "../pages/ListadoPage/ListadoAction";
import { useDispatch } from "react-redux";


const MenuOptionComponent = () => {
    let location = useLocation()
    const dispatch = useDispatch();
    // console.log('location',location);
    const {
      pathname
    } = location
    let navigate = useNavigate()

    const goHome = () => {
      navigate('/')
      //en un futuro para quitar el seleccionado
      setTimeout(() => dispatch(setSelectSong(null)), 0)
      
  }
  const goListado = () => {
      navigate('/listado')
      setTimeout(() => dispatch(setSelectSong(null)), 0)
  }
  const goPerfil = () => {
      navigate('/miprofile')
      setTimeout(() => dispatch(setSelectSong(null)), 0)
  }
  const goCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("nombre");
  
      navigate('/login')
      setTimeout(() => setSelectSong(), 0)

  }



  return (
    <div>
      <div className="contenedor-botones">
        <div>
          <button onClick={goHome}>Home</button>
        </div>
        <div>
          <button onClick={goListado}>Canciones</button>
        </div>
        <div>
          <button onClick={goPerfil}>Mi perfil</button>
        </div>
        <div>
          <button onClick={goCerrarSesion}>Cerrar sesion</button>
        </div>
      </div>
    </div>
  );
};

export default MenuOptionComponent;
