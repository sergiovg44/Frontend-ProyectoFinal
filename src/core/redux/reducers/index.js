import { combineReducers } from "redux"
import changeOptionRegister from "../../../pages/LoginPage/LoginReducer"
import songsReducer from "../../../pages/ListadoPage/ListadoReducer"





const reducers = combineReducers({
    changeOptionRegister,
    songsReducer

})

export default reducers