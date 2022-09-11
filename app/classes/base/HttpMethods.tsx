import Global from "../../global/Global";

export default abstract class HttpMethods<T> {
    private _id: string = "";
    get id(): string {return this._id};

    async get() : Promise<Response>{
        return await fetch(Global.URL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        });
    }

    async delete() : Promise<Response>{
        return await fetch(Global.URL, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this._id)
        });
    }

    async add() : Promise<Response>{
        return await fetch(Global.URL, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        });
    }

    async update() : Promise<Response>{
        return await fetch(Global.URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        });
    }        
}