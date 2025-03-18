import { handleTokenExpired } from "../../utils/utils";

// Esta es la url basica ya dependiendo de cada peticion cambiara el final
const url = `http://localhost:3000`;

export const createUser = async (newUser) => {
  try {
    console.log("Enviando usuario:", newUser);

    const res = await fetch(`${url}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    let result;
    try {
      result = await res.json();
    } catch (jsonError) {
      throw new Error(
        `Error en la respuesta del servidor (no es JSON): ${jsonError.message}`
      );
    }

    if (!res.ok) {
      throw new Error(result.message || `Error: ${res.status}`);
    }

    return result;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return { success: false, message: error.message };
  }
};

export const loginUser = async (newUser) => {
    try {
      const response = await fetch(`${url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        return { success: false, message: result.message || "Usuario o contraseña incorrectos." };
      }
  
      const { id, token, nombre } = result.data;
  
      localStorage.setItem("id", id);
      localStorage.setItem("token", token);
      localStorage.setItem("nombre", nombre);
  
      return { success: true, message: "Inicio de sesión exitoso" };
  
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return { success: false, message: "Hubo un problema al iniciar sesión. Inténtalo más tarde." };
    }
  };
  
  export const getSongs = async () => {
    try {
      const res = await fetch(`${url}/song/songs`);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const result = await res.json();
      //saco el data de la respuesta de la base de datos 
      return result.data;
    } catch (error) {
      console.error("Error al obtener las canciones:", error);
      return { success: false, message: error.message };
    }
  };

export const getSongId = async (songId) => {
  try {
    const res = await fetch(`${url}/song/songs/${songId}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Error al obtener la cancion:", error);
    return { success: false, message: error.message };
  }
};

export const toggleFavourite = async (idSong, method , dispatch, navigate) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Debes iniciar sesión para agregar favoritos." };
    }

    const res = await fetch(`${url}/user/favourite/${idSong}`, {
      method: method, // O "PUT" según tu ruta
      headers: {
        "Content-Type": "application/json",
        "auth-token": token, 
      },
    });

    if (res.status === 401) {
      handleTokenExpired(dispatch, navigate)
      return { success: false, expired: true, message: "Token expirado" };
    }
    const result = await res.json();
    console.log(" Respuesta del backend:", result);

    if (!res.ok) {
      return { success: false, message: result.message };
    }

   return { success: true, message: result.message, data: result.data };

  } catch (error) {
    console.error("Error al agregar favorito:", error);
    return { success: false, message: "Error de red o del servidor." };
  }
};

export const getUserId = async (dispatch, navigate) => {
  try {
    const token = localStorage.getItem("token");


    if (!token) {
      return { success: false, message: "Debes iniciar sesión para obtener los datos." };
    }

    const res = await fetch(`${url}/user/user`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": token, 
      },
    });

    if (res.status === 401) {
      //Esto es para cuando caduca el token
      handleTokenExpired(dispatch, navigate)
      return { success: false, expired: true, message: "Token expirado" };
    }
    const result = await res.json();
    if (!res.ok) {
      return { success: false, message: result.message };
    }
    return { success: true, data: result.data }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return { success: false, message: error.message };
  }
};



export const updateDonut = async (modifiUser ,dispatch, navigate) => {
  try {
    const token = localStorage.getItem("token");


    if (!token) {
      return { success: false, message: "Debes iniciar sesión para obtener los datos." };
    }
    const res = await fetch(`${url}/${dd}`, {
      method: "PATCH",
      headers: {
        "content-type": "Application/json",
        "auth-token": token, 
      },
      body: JSON.stringify(modifiUser),
    });

    if (res.status === 401) {
      //Esto es para cuando caduca el token
      handleTokenExpired(dispatch, navigate)
      return { success: false, expired: true, message: "Token expirado" };
    }
    const result = await res.json();
    if (!res.ok) {
      return { success: false, message: result.message };
    }
    return { success: true, data: result.data }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return { success: false, message: error.message };
  }
};