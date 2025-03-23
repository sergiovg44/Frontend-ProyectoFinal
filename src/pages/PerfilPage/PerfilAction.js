export const OPTION_UPDATE = 'OPTION_UPDATE'




export const setOptionUpdate = (option) => {
    return {
        type: OPTION_UPDATE,
         
        payload: option, 
    };
};
