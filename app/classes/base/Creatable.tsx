import Client from "./Client";

export default abstract class CreateDeleteUpdate<T> {
    private _id: string = "";
    get id(): string {return this._id};

    private _route = "";

    constructor(type : new () => T){
        this._route = "api/" + type.name;
    }

    async delete() : Promise<Response>{
        return Client.delete(this._route, {
            params: this
        })
    }

    async add() : Promise<Response>{
        return Client.post(this._route, {
            params: this
        })
    }

    async update() : Promise<Response>{
        return Client.put(this._route, {
            params: this
        })
    } 
    
    private static capitalizer = (key: any, value: any) => {
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