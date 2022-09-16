export default class Response<type>{
    private _message: string = "";
    get message(): string { return this._message; }

    private _title: string = "";
    get title(): string { return this._title; }

    private _type: string = "";
    get type(): string { return this._type; }

    private _data: type | undefined | null;
    get data(): type | undefined | null { return this._data; }

    private constructor() {}   
}