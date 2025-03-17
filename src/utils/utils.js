

 
 export const transformTime = (ms) =>{

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
  
    return `${paddedMinutes}:${paddedSeconds} min`;
  };
    

  export const transformDate = (date) =>{
    if (!date) return null;
  
    const [dateFormatted] = date.split("T");
    const [year, month, day] = dateFormatted.split("-");
    return `${day}/${month}/${year}`;
  }


  export const handleTokenExpired = (dispatch, navigate) => {
    console.log("🔴 handleTokenExpired ejecutado")
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("nombre");
  
    dispatch(setUser(null));   
    navigate("/login");        
  };