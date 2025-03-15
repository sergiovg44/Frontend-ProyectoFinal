
// Esta es la url basica ya dependiendo de cada peticion cambiara el final
const url =`http://localhost:3000`

// export const createUser = async (newUser) => {
//     try {
//         console.log(newUser)
//       const res = await fetch(`${url}/user/register`, {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(newUser),
//       });
//       if (!res.ok) {
//         throw new Error(`Error: ${res.status}`);
//       }
//       const result = await res.json();
//       return result;
//     } catch (error) {
//       console.error("Error al registrar el usuario:", error);
//       return { success: false, message: error.message };
//     }
//   };

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
            throw new Error(`Error en la respuesta del servidor (no es JSON): ${jsonError.message}`);
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
