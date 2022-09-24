import Toast from "react-native-toast-message";
import Global from "../global/Global";
import AdoteResponse from "./base/AdoteResponse";
import Client from "./base/Client";
import Creatable from "./base/Creatable";

export default class User extends Creatable<User>{
    private _password: string = "";
    public get password(): string {return this._password}
    public set password(value: string) {
        var CryptoJS = require("crypto-js");
        this._password = CryptoJS.HmacSHA512(value, "b1vs0TcbpNzRKk3LaIK0").toString()
    }

    constructor(
        public name:string = "",
        public email:string = "",
        public phoneNumber:string = "",
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