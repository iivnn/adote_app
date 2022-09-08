import { getActionFromState } from "@react-navigation/native";
import { AppConfig } from "../config/AppConfig";
import Base from "./base/Base";

export default class Animal{
    private _name: string = "";
    get login(): string { return this._name; }

    static async get(request: object) : Promise<Response>{
        return await fetch(AppConfig.url+"\\animal", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
    }

    async add(request: Animal) : Promise<Response>{
        return await fetch(AppConfig.url+"\\animal", {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
    }
}