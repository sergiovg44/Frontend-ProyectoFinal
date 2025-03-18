import { OPTION_UPDATE } from "./PerfilAction";


const initialState = {
    optionUpdate: false,

};


const optionUpdateReducer = (state = initialState, action) => {
    // console.log("Reducer ejecutado con action:", action)
    switch (action.type) {
        case OPTION_UPDATE:
            return{
               ...state, 
               optionUpdate: action.payload
            }
            
        default:
            return state
    }
}

export default optionUpdateReducer