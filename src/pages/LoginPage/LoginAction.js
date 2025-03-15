export const OPTION_REGISTER = 'OPTION_REGISTER'




export const setOptionRegister = (option) => {
    return {
        type: OPTION_REGISTER,
        //Aqui envimos solo true y false depende si queremos hacer el registro o no 
        payload: option, 
    };
};
