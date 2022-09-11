import axios from "axios";
import CryptoJS from "crypto-js";
import Global from "../global/Global";

export default class User{

    private static _login: string;
    static get login(): string { return this._login; }
   
    private static _userName: string;
    static get userName(): string { return this._userName; }

    private static _token: string;
    static get token(): string { return this._token; }

    private static _telephoneNumber: string;
    static get telephoneNumber(): string { return this._telephoneNumber; }

    static get isLogged(): boolean { return this._token != "" && this._token != undefined && this._token != null; }

    private constructor(){}

    //Web Methods
    public static loginWS(login: string, password: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            setTimeout(()=>{
                if(login != "" && password != "")
                    resolve(true);
                else
                    reject();    
            }, 3000)
        });
    }

    public static logoutWS(){
        throw new Error("Not implemented") 
        this._login = "";
        this._telephoneNumber = "";
        this._token = "";
        this._userName = "";
    }

    public static changePasswordWS(oldPassword: string, newPassword: string){   
        throw new Error("Not implemented")  
        oldPassword = this.encrypt(oldPassword);
        newPassword = this.encrypt(newPassword);
    }

    //other
    private static encrypt(data: string): string{
        return CryptoJS.AES.encrypt(data, "adote_app").toString();
    }
    
    static async isEmailAvailable(email: string){
        try{
            const x = axios.create({
                baseURL: 'http://192.168.1.39:5083'
            })
            console.log("🚀 ~ file: User.tsx ~ line 59 ~ User ~ isEmailAvailable ~ x", x)
            console.log("🚀 ~ file: User.tsx ~ line 61 ~ User ~ isEmailAvailable ~ x.getUri", x.getUri())
            const r = x.get("user", {
                params: {email: "awdawdaw"}
            })
            console.log("🚀 ~ file: User.tsx ~ line 61 ~ User ~ isEmailAvailable ~ kkkkk", (await r).config)

            console.log("🚀 ~ file: User.tsx ~ line 64 ~ User ~ isEmailAvailable ~ r", r)

            r.then((v) => {
                console.log("🚀 ~ file: User.tsx ~ line 63 ~ User ~ isEmailAvailable ~ v", v.data)
            })
            .catch(function (error) {
                console.log("🚀 ~ file: User.tsx ~ line 72 ~ User ~ isEmailAvailable ~ error", error)
                console.log(JSON.stringify(error))

                          
            })
            
        }catch(ex){
            console.log("🚀 ~ file: User.tsx ~ line 69 ~ User ~ isEmailAvailable ~ ex", ex)   
            console.log(JSON.stringify(ex))         
        }

    }
}