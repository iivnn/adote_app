import Toast from "react-native-toast-message";
import Global from "../global/Global";
import AdoteResponse from "./base/AdoteResponse";
import Client from "./base/Client";
import Creatable from "./base/Creatable";

export default class User extends Creatable<User>{
    constructor(
        public name = "",
        public email = "" 
    ){
        super(User);
    }
   
    static async isEmailAvailable(email: string): Promise<AdoteResponse<boolean>>{
        return new Promise<AdoteResponse<boolean>>((resolve, reject) => {
            Client.get("api/User/IsEmailAvailable", {
                params: {email: email}
            })
            .then((response) => {
                const adoteResponse = (response.data as AdoteResponse<boolean>);
                resolve(adoteResponse);        
            })
            .catch((error) => {
                Toast.show({
                    type: 'error',
                    text1: error.response.data.message.title,
                    text2: error.response.data.message.text,
                    visibilityTime: Global.TOAST.ERROR_TIME
                })
                reject(error);
            })
        });          
    }
}