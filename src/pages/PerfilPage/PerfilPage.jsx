import React, { useEffect, useState } from "react";
import MenuOptionComponent from "../../components/MenuOptionComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loadUser, verificarTokenPeriodicamente } from "../../utils/utils";
import { setUser } from "../ListadoPage/ListadoAction";
import { setOptionUpdate } from "./PerfilAction";
import { updateDonut } from "../../core/services/ProductFetch";

const PerfilPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { optionUpdate } = useSelector((state) => state.optionUpdateReducer);
  const { songs, selectedSong, userLogin } = useSelector(
    (state) => state.songsReducer
  );
  const [modifiUser, setModifiUser] = useState({
    nombre: "",
    apellidos: "",
    password: "",
  });

  const checkFields = (user) => {
    if (user.nombre.length < 3) {
      alert("El nombre debe tener al menos 3 caracteres.");
      return false;
    }

    if (user.apellidos.length < 3) {
      alert("El apellido debe tener al menos 3 caracteres.");
      return false;
    }
    if (user.password.length < 3) {
      alert("La contraseña debe tener al menos 3 caracteres.");
      return false;
    }

    return true;
  };
  const modifiHandler = async () => {
    const isValid = checkFields(modifiUser);
    if (!isValid) return;

    try {
      const response = await updateDonut(modifiUser, dispatch, navigate)

      if (!response.success) {
        alert("Error: " + response.message);
        return;
      }
      alert("Modificación exitosa");
      loadUser(dispatch, navigate, setUser)
      optionUpdate(false);
    } catch (error) {
      alert("Hubo un error en el registro. " + error.message);
    }
  };
  const handlerRegisterUser = (name, value) => {
    setModifiUser({
      ...modifiUser,
      [name]: value,
    });
  };

  useEffect(() => {
    if (userLogin?.nombre) {
      setModifiUser({
        nombre: userLogin.nombre,
        apellidos: userLogin.apellidos,
        password: "", // Vacía por seguridad
      });
    }
  }, [userLogin]);

  useEffect(() => {
    const intervalId = verificarTokenPeriodicamente(dispatch, navigate);
    console.log(userLogin);
    return () => clearInterval(intervalId);
  }, [dispatch, navigate]);

  useEffect(() => {
    loadUser(dispatch, navigate, setUser);
  }, []);
  return (
    <div>
      <div>
        <MenuOptionComponent />
      </div>
      <div className="contenedor-pages">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar-container">
              <img
                src={userLogin.profileImage}
                alt="Avatar"
                className="avatar"
              />
            </div>

            <h2 className="title">Datos de usuario</h2>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <span className="label">Nombre</span>
              {!optionUpdate ? (
                <span className="value">{userLogin.nombre}</span>
              ) : (
                <input
                  className="input"
                  type="text"
                  value={modifiUser.nombre}
                  name="nombre"
                  onChange={(e) =>
                    handlerRegisterUser(e.target.name, e.target.value)
                  }
                />
              )}
            </div>
            <div className="info-row">
              <span className="label">Apellidos</span>
              {!optionUpdate ? (
                <span className="value">{userLogin.apellidos}</span>
              ) : (
                <input
                  className="input"
                  type="text"
                  value={modifiUser.apellidos}
                  name="apellidos"
                  onChange={(e) =>
                    handlerRegisterUser(e.target.name, e.target.value)
                  }
                />
              )}
            </div>
            <div className="info-row">
              <span className="label">Email</span>
              {!optionUpdate ? (
                <span className="value">{userLogin.email}</span>
              ) : (
                <input
                  className="input"
                  type="text"
                  value={userLogin.email}
                  name="email"
                  disabled
                />
              )}
            </div>
            {!optionUpdate ? (
              ""
            ) : (
              <div className="info-row">
                <span className="label">Contraseña</span>
                <input
                  className="input"
                  type="text"
                  placeholder="Nueva Contraseña"
                  name="password"
                  onChange={(e) =>
                    handlerRegisterUser(e.target.name, e.target.value)
                  }
                />
              </div>
            )}
          </div>
          {!optionUpdate ? (
            <button
              className="edit-button"
              onClick={() => dispatch(setOptionUpdate(true))}
            >
              Editar
            </button>
          ) : (
            <div>
              <button className="edit-button" onClick={()=>modifiHandler()}>Guardar</button>
              <button
                className="edit-button"
                onClick={() => dispatch(setOptionUpdate(false))}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
