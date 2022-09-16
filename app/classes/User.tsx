import Client from "./base/Client";
import Creatable from "./base/Creatable";

export default class User extends Creatable<User>{
    constructor(
        public name = "",
        public email = "" 
    ){
        super(User);
    }
   
    static async isEmailAvailable(email: string){           
        return Client.get("User/IsEmailAvailable", {
            params: {email: email}
        })
    }
}