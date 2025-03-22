export const OPTION_REGISTER = 'OPTION_REGISTER'




export const setOptionRegister = (option) => {
    return {
        type: OPTION_REGISTER,
        payload: option, 
    };
};
