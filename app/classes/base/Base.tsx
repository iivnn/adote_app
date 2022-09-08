import { AppConfig } from "../../config/AppConfig";

export default abstract class Base {

    protected async get(request: object) : Promise<Response>{
        return await fetch(AppConfig.url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
    }

    protected async delete(request: object) : Promise<Response>{
        return await fetch(AppConfig.url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
    }

    protected async add(request: object) : Promise<Response>{
        return await fetch(AppConfig.url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
    }

    protected async update(request: object) : Promise<Response>{
        return await fetch(AppConfig.url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
    }        
}