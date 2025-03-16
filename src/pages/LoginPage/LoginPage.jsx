import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOptionRegister } from "./LoginAction";
import { createUser, loginUser } from "../../core/services/ProductFetch";
import { useNavigate } from "react-router";

const LoginPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { optionRegister } = useSelector((state) => state.changeOptionRegister);

  const [newUser, setNewUser] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
  });
  const goHome = () => {
    navigate("/");
  };

  const changeRegister = (value) => {
    // console.log(optionRegister)
    dispatch(setOptionRegister(value));
    // console.log(optionRegister)
    setNewUser({
      nombre: "",
      apellidos: "",
      email: "",
      password: "",
    });
  };

  const checkFields = (user) => {
    if (optionRegister) {
      if (user.nombre.length < 3) {
        alert("El nombre debe tener al menos 3 caracteres.");
        return false;
      }

      if (user.apellidos.length < 3) {
        alert("El apellido debe tener al menos 3 caracteres.");
        return false;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      alert("Por favor, ingresa un email válido.");
      return false;
    }
    if (user.password.length < 3) {
      alert("La contraseña debe tener al menos 3 caracteres.");
      return false;
    }

    return true;
  };

  const registerHandler = async (e) => {
    const isValid = checkFields(newUser);
    if (!isValid) return;

    try {
      const response = await createUser(newUser);

      if (!response.success) {
        alert("Error: " + response.message);
        return;
      }
      setNewUser({
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
      });

      alert("Registro exitoso");
      changeRegister(false);
    } catch (error) {
      alert("Hubo un error en el registro. " + error.message);
    }
  };
  const handlerRegisterUser = (name, value) => {
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const loginHandler = async () => {
    const isValid = checkFields(newUser);
    if (!isValid) return;

    try {
      const response = await loginUser(newUser);

      if (!response.success) {
        alert("Error: " + response.message);
        return;
      }
      setNewUser({
        email: "",
        password: "",
      });

      alert("Inicio de sesión exitoso");
      goHome();
    } catch (error) {
      alert("Hubo un error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div>
      <div className="contenedor-login">
        <div className="form">
          {optionRegister ? (
            <>
              <h2 className="title">Registro </h2>
              <p className="message">
                Registrate para tener acceso a mas funciones
              </p>
            </>
          ) : (
            <>
              <h2 className="title">Inicio de Sesión</h2>
            </>
          )}
          {optionRegister ? (
            <>
              <label>
                <input
                  className="input"
                  type="text"
                  value={newUser.nombre}
                  name="nombre"
                  onChange={(e) =>
                    handlerRegisterUser(e.target.name, e.target.value)
                  }
                />
                <span>Nombre</span>
              </label>

              <label>
                <input
                  className="input"
                  type="text"
                  value={newUser.apellidos}
                  name="apellidos"
                  onChange={(e) =>
                    handlerRegisterUser(e.target.name, e.target.value)
                  }
                />
                <span>Apellidos</span>
              </label>
            </>
          ) : (
            ""
          )}
          <label>
            <input
              className="input"
              type="email"
              value={newUser.email}
              name="email"
              onChange={(e) =>
                handlerRegisterUser(e.target.name, e.target.value)
              }
            />
            <span>Email</span>
          </label>

          <label>
            <input
              className="input"
              type="password"
              value={newUser.password}
              name="password"
              onChange={(e) =>
                handlerRegisterUser(e.target.name, e.target.value)
              }
            />
            <span>Contraseña</span>
          </label>
          {optionRegister ? (
            <>
              <button className="submit" onClick={() => registerHandler()}>
                Registro
              </button>

              <span>
                <>
                  Ya tienes cuenta?{" "}
                  <span
                    className="change-register"
                    onClick={() => changeRegister(false)}
                  >
                    Inicia sesión
                  </span>
                </>
              </span>
            </>
          ) : (
            <>
              <button className="submit" onClick={() => loginHandler()}>
                Inicio sesión
              </button>
              <span>
                <>
                  No tienes cuenta?{" "}
                  <span
                    className="change-register"
                    onClick={() => changeRegister(true)}
                  >
                    Regístrate
                  </span>
                </>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
