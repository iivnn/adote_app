import Toast from "react-native-toast-message";
import Global from "../global/Global";
import AdoteResponse from "./base/AdoteResponse";
import Client from "./base/Client";
import ApiClass from "./base/ApiClass";

export default class User extends ApiClass<User>{
    constructor(
        public name:string = "",
        public email:string = "",
        public phoneNumber:string = "",
        public password:string = "",
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
                reject(error);
            })
        });          
    }
}