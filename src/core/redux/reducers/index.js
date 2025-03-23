import { combineReducers } from "redux"
import changeOptionRegister from "../../../pages/LoginPage/LoginReducer"
import songsReducer from "../../../pages/ListadoPage/ListadoReducer"
import optionUpdateReducer from "../../../pages/PerfilPage/PerfilReducer"





const reducers = combineReducers({
    changeOptionRegister,
    songsReducer,
    optionUpdateReducer

})

export default reducers