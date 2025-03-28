import React, { useEffect, useState } from "react";
import MenuOptionComponent from "../../components/MenuOptionComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loadUser, verificarTokenPeriodicamente } from "../../utils/utils";
import { setUser } from "../ListadoPage/ListadoAction";
import { setOptionUpdate } from "./PerfilAction";
import {
  deleteUser,
  updateImage,
  updateUser,
} from "../../core/services/ProductFetch";
import { toast } from "react-toastify";

const PerfilPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { optionUpdate } = useSelector((state) => state.optionUpdateReducer);
  const { userLogin } = useSelector(
    (state) => state.songsReducer
  );
  const [modifiUser, setModifiUser] = useState({
    nombre: "",
    apellidos: "",
    password: "",
  });

  const checkFields = (user) => {
    if (user.nombre.length < 3) {
      toast.info("El nombre debe tener al menos 3 caracteres.");
      return false;
    }

    if (user.apellidos.length < 3) {
      toast.info("El apellido debe tener al menos 3 caracteres.");
      return false;
    }
    if (user.password && user.password.length < 3) {
      toast.info("La contraseña debe tener al menos 3 caracteres.");
      return false;
    }

    return true;
  };
  const modifiHandler = async () => {
    const isValid = checkFields(modifiUser);
    if (!isValid) return;

    try {
      const dataToSend = { ...modifiUser };
      if (!dataToSend.password) {
        delete dataToSend.password;
      }

      const response = await updateUser(dataToSend, dispatch, navigate);

      if (!response.success) {
        toast.error("Error: " + response.message);
        return;
      }
      toast.success("Modificación exitosa");
      loadUser(dispatch, navigate, setUser);
      dispatch(setOptionUpdate(false));
    } catch (error) {
      toast.error("Hubo un error en el registro. " + error.message);
    }
  };
  const handlerRegisterUser = (name, value) => {
    setModifiUser({
      ...modifiUser,
      [name]: value,
    });
  };

  const handleImageChange = (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.info("Solo se permiten imágenes JPG, PNG o WEBP.");
      return;
    }

    imageHandlerUser(file);
  };

  const imageHandlerUser = async (file) => {
    if (!file) {
      toast.info("Debes seleccionar una imagen.");
      return;
    }

    try {
      const response = await updateImage(file, dispatch, navigate);

      if (!response.success) {
        toast.error("Error: " + response.message);
        return;
      }

      toast.success("Imagen actualizada exitosamente");
      await loadUser(dispatch, navigate, setUser);
    } catch (error) {
      toast.error("Hubo un error al subir la imagen: " + error.message);
    }
  };

  const handlerDeleteUser = async (dispatch, navigate) => {
    const token = localStorage.getItem("token");
    if (token) {
      const confirmDelete = window.confirm(
        "¿Seguro que deseas eliminar tu cuenta?"
      );
      if (confirmDelete) {
        const response = await deleteUser(dispatch, navigate);

        if (response.success) {
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          localStorage.removeItem("nombre");
          navigate("/");
          dispatch(setUser(null));
          dispatch(setOptionUpdate(false));
        } else {
          toast.error("No se pudo eliminar el usuario.");
        }
      }
    }
  };

  useEffect(() => {
    if (userLogin?.nombre) {
      setModifiUser({
        nombre: userLogin.nombre,
        apellidos: userLogin.apellidos,
        password: "", 
      });
    }
  }, [userLogin]);

  useEffect(() => {
    const intervalId = verificarTokenPeriodicamente(dispatch, navigate);
    return () => clearInterval(intervalId);
  }, [dispatch, navigate]);

  useEffect(() => {
    loadUser(dispatch, navigate, setUser);
  }, []);

  return (
    <div className="container">
      <div>
        <MenuOptionComponent />
      </div>
      {!userLogin ? (
        <div className="contenedor-pages">Cargando usuario...</div>
      ) : (
        <div className="contenedor-pages">
          <div className="content-center">
            <div className="profile-card">
              <div className="profile-header">
                <div className="avatar-container">
                  <img
                    src={userLogin.profileImage}
                    alt="Avatar"
                    className="avatar"
                    onClick={() =>
                      document.getElementById("input-avatar").click()
                    }
                  />
                  <input
                    type="file"
                    className="input-file"
                    id="input-avatar"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files[0])}
                  />
                </div>

                <h2 className="title">Datos de usuario</h2>
              </div>

              <div className="profile-info">
                {!optionUpdate ? (
                  <div className="info-row">
                    <span className="label">Nombre</span>
                    <span className="value">{userLogin.nombre}</span>
                  </div>
                ) : (
                  <div className="input-container">
                    <label>
                      <input
                        className="input"
                        type="text"
                        value={modifiUser.nombre}
                        name="nombre"
                        onChange={(e) =>
                          handlerRegisterUser(e.target.name, e.target.value)
                        }
                      />
                      <span>Nombre</span>
                    </label>
                  </div>
                )}

                {!optionUpdate ? (
                  <div className="info-row">
                    <span className="label">Apellidos</span>
                    <span className="value">{userLogin.apellidos}</span>
                  </div>
                ) : (
                  <div className="input-container">
                    <label>
                      <input
                        className="input"
                        type="text"
                        value={modifiUser.apellidos}
                        name="apellidos"
                        onChange={(e) =>
                          handlerRegisterUser(e.target.name, e.target.value)
                        }
                      />
                      <span>Apellidos</span>
                    </label>
                  </div>
                )}

                {!optionUpdate ? (
                  <div className="info-row">
                    <span className="label">Email</span>
                    <span className="value">{userLogin.email}</span>
                  </div>
                ) : (
                  <div className="input-container">
                    <label>
                      <input
                        className="input email"
                        type="text"
                        value={userLogin.email}
                        name="email"
                        disabled
                      />
                      <span>Email</span>
                    </label>
                  </div>
                )}

                {optionUpdate && (
                  <div className="input-container">
                    <label>
                      <input
                        className="input"
                        type="text"
                        placeholder="Nueva Contraseña"
                        name="password"
                        value={modifiUser.password}
                        onChange={(e) =>
                          handlerRegisterUser(e.target.name, e.target.value)
                        }
                      />
                      <span>Contraseña</span>
                    </label>
                  </div>
                )}
              </div>
              {!optionUpdate ? (
                <div className="container-button">
                  <button
                    className="edit-button"
                    onClick={() => dispatch(setOptionUpdate(true))}
                  >
                    Editar
                  </button>
                </div>
              ) : (

                  <div className="container-button">
                    <button
                      className="edit-button"
                      onClick={() => modifiHandler()}
                    >
                      Actualizar
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => handlerDeleteUser(dispatch, navigate)}
                    >
                      Eliminar
                    </button>
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
      )}
    </div>
  );
};

export default PerfilPage;
