import Global from "../global/Global";
import AdoteResponse from "./base/AdoteResponse";
import Client from "./base/Client";
import ApiClass from "./base/ApiClass";
import { RSA }  from 'react-native-rsa-native';

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
                reject(Global.handleError(error));             
            })
        });          
    }

    static async authenticate(email: string, password: string): Promise<AdoteResponse<User>>{
        return new Promise<AdoteResponse<User>>((resolve, reject) => {
            Client.post("api/User/Authenticate", {})
            .then((response) => {               
                const adoteResponse = (response.data as AdoteResponse<User>);
                resolve(adoteResponse);        
            })
            .catch((error) => {
                reject(Global.handleError(error));               
            })
        });          
    }

    private static Encrypt(target: string){
        RSA.generateKeys(4096) // set key size
        .then(keys => {
            RSA.encrypt(target, keys.public)
            .then(encodedMessage => {
                console.log(`the encoded message is ${encodedMessage}`);
                RSA.decrypt(encodedMessage, keys.private)
                .then(decryptedMessage => {
                    console.log(`The original message was ${decryptedMessage}`);
                });
            });
        });
    }
}