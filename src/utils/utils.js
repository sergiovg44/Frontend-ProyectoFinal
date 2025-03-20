import { toast } from "react-toastify";
import { getSongs, getUserId } from "../core/services/ProductFetch";
import { setSongs, setUser } from "../pages/ListadoPage/ListadoAction";

export const transformTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${paddedMinutes}:${paddedSeconds} min`;
};

export const transformDate = (date) => {
  if (!date) return null;

  const [dateFormatted] = date.split("T");
  const [year, month, day] = dateFormatted.split("-");
  return `${day}/${month}/${year}`;
};

export const handleTokenExpired = (dispatch, navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("nombre");

  dispatch(setUser(null));
  toast.info("Se ha excedido el tiempo de la sesion");
  navigate("/login");
};

export const loadUser = async (dispatch, navigate) => {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await getUserId(dispatch, navigate);
    if (response.success) {
      dispatch(setUser(response.data));
    }
  }
};

export const loadSongs = async (dispatch) => {
    const songs = await getSongs();
    if(songs.success){
      dispatch(setSongs(songs.data));
    }
};


export const verificarTokenPeriodicamente = (dispatch, navigate, intervaloMs = 60000) => {
  const intervalId = setInterval(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await getUserId(dispatch, navigate);

    if (response.expired) {

      clearInterval(intervalId); 
    }
  }, intervaloMs);

  return intervalId;
};