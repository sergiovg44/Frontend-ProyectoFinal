import { OPTION_REGISTER } from "./LoginAction";

const initialState = {
    optionRegister: false,

};


const changeOptionRegister = (state = initialState, action) => {

    switch (action.type) {
        case OPTION_REGISTER:
            return{
               ...state, 
               optionRegister: action.payload
            }
            
        default:
            return state
    }
}

export default changeOptionRegister