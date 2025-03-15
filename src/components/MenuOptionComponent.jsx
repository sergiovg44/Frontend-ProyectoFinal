import React from "react";
import { useLocation, useNavigate } from "react-router";

const MenuOptionComponent = () => {
    let location = useLocation()
    // console.log('location',location);
    const {
      pathname
    } = location
    let navigate = useNavigate()


  return (
    <div>
      <div className="contenedor-botones">
        <div>
          <button></button>
        </div>
        <div>
          <button ></button>
        </div>
        <div>
          <button ></button>
        </div>
        <div>
          <button ></button>
        </div>
      </div>
    </div>
  );
};

export default MenuOptionComponent;
