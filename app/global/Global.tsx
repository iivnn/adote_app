import { AxiosError } from "axios";

const Global = {
    COLOR: {
        MAIN_COLOR: "darkturquoise"
    },
    TOAST: {
        ERROR_COLOR: "red",
        SUCCESS_COLOR: "green",
        INFO_COLOR: "deepskyblue"
    },
    URL: "http://192.168.1.43:5083",
    TIMEOUT: 1000 * 15,

    handleError(erro: any): any{
       if(erro instanceof AxiosError){
        if(erro.code == "ECONNABORTED"){
            return { type: 'error', text1: 'Erro', text2: 'O tempo limite da operação foi excedido.'};
        }    
       } 

       return { type: 'error', text1: 'Erro', text2: 'Desculpe, ocorreu um erro desconhecido.'}; 
    }
}

export default Global;