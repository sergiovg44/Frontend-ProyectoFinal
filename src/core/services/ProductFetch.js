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
    console.log(newUser)
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

  // Función para obtener la información de un donut por ID
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