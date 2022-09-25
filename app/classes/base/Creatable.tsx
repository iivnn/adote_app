import Toast from "react-native-toast-message";
import Global from "../../global/Global";
import AdoteResponse from "./AdoteResponse";
import Client from "./Client";

export default abstract class Creatable<T> {
    private _id?: string = "";
    get id(): string | undefined {return this._id};

    private _route = "";

    constructor(type : new () => T){
        this._route = "api/" + type.name;
    }

    async delete() : Promise<Response>{
        return Client.delete(this._route, {
            params: this
        })
    }

    async add() : Promise<AdoteResponse<T>>{
        return new Promise<AdoteResponse<T>>((resolve, reject) => {
            var param = JSON.parse(JSON.stringify(this, Creatable.removeUnnecessaryProperites));
            Client.post(this._route, param)
            .then((response) => {
                const adoteResponse = (response.data as AdoteResponse<T>);
                resolve(adoteResponse);        
            })
            .catch((error) => {
                if(error.response.data.message){                    
                    Toast.show({
                        type: error.response.data.message.type,
                        text1: error.response.data.message.title,
                        text2: error.response.data.message.text,
                        visibilityTime: Global.TOAST.ERROR_TIME
                    })
                    reject(error);        
                }
            })
        })
    }

    async update() : Promise<Response>{
        return Client.put(this._route, {
            params: this
        })
    } 
    
    private static removeUnnecessaryProperites = (key: any, value: any) => {
        if (value && typeof value === 'object') {
            var replacement: any = {};
            for (var k in value) {
              if (Object.hasOwnProperty.call(value, k)) {
                if(k == "_id"){
                    replacement["id"] = value[k];
                    continue;
                }
                if(k.startsWith("_"))
                    continue;
                replacement[k] = value[k];
              }
            }
            return replacement;
          }
          return value;
    }
}