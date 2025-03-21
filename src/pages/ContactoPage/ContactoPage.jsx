import React, { useState } from "react";
import MenuOptionComponent from "../../components/MenuOptionComponent";

const ContactoPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const checkFields = (datos) => {
    if (datos.name.trim().length < 3) {
      toast.info("El nombre debe tener al menos 3 caracteres.");
      return false;
    }
  
    if (datos.subject.trim().length < 3) {
      toast.info("El asunto debe tener al menos 3 caracteres.");
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(datos.email)) {
      toast.info("Por favor, ingresa un correo electrónico válido.");
      return false;
    }
  
    if (datos.message.trim() === "") {
      toast.info("El mensaje no puede estar vacío.");
      return false;
    }
  
    return true; 
  };

  const handlerContact = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        <MenuOptionComponent />
      </div>
      <div className="contenedor-login">
        <div className="form content-contact">
          <h2 className="title">Contacto </h2>
          <p className="message">Dejanos tus datos y contactaremos contigo</p>
          <label>
            <input
              className="input"
              type="text"
              value={formData.name}
              name="name"
              onChange={(e) => handlerContact(e.target.name, e.target.value)}
            />
            <span>Nombre</span>
          </label>
          <label>
            <input
              className="input"
              type="text"
              value={formData.email}
              name="email"
              onChange={(e) => handlerContact(e.target.name, e.target.value)}
            />
            <span>Correo</span>
          </label>
          <label>
            <input
              className="input"
              type="text"
              value={formData.subject}
              name="subject"
              onChange={(e) => handlerContact(e.target.name, e.target.value)}
            />
            <span>Asunto</span>
          </label>
          <label>
            <textarea
              className="input"
              value={formData.message}
              name="message"
              rows="8"
              onChange={(e) => handlerContact(e.target.name, e.target.value)}
            />
            <span>Mensaje</span>
          </label>
          <button className="submit">Contacto</button>
        </div>
      </div>
    </div>
  );
};

export default ContactoPage;
