import CryptoJS from "crypto-js";

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
}