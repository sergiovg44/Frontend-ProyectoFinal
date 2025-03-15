import React from "react";




const LoginPage = () => {
  return (
    <div>
      <form className="form">
        <h2 className="title">Registro </h2>
        <p className="message">Registrate para tener acceso a mas funciones </p>
        <label>
          <input className="input" type="text" />
          <span>Nombre</span>
        </label>

        <label>
          <input className="input" type="text" />
          <span>Apellidos</span>
        </label>

        <label>
          <input className="input" type="email"  />
          <span>Email</span>
        </label>

        <label>
          <input className="input" type="password"  />
          <span>Contraseña</span>
        </label>
        <button className="submit">Registro</button>
      </form>
    </div>
  );
};

export default LoginPage;
