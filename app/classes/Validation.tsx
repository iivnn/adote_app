export class Validation{
    get isValid(): boolean { return this._errors.length > 0; }

    private _target: object;
    get target(): object { return this._target; }

    private _errors: Array<string> = []
    get errors(): Array<string> { return this._errors; }
    
    constructor(object: object){
        this._target = object;
    }

    isEmail(message: string = "E-mail inválido."){
        let valid = true
        if(typeof this._target != "string"){
            valid = false;
        }

        const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(!regexEmail.test(this._target as unknown as string)){
            valid = false;
        }

        if(!valid)
            this._errors.push(message)
    }

    maxLenght(length: number, message: string = "Tamanho máximo inválido."){
        let valid = true
        if(typeof this._target != "string"){
            valid = false;
        }

        const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(!regexEmail.test(this._target as unknown as string)){
            valid = false;
        }

        if(!valid)
            this._errors.push(message)
    }

    minLenght(length: number, message: string = "Tamanho mínimo inválido."){
        let valid = true
        if(typeof this._target != "string"){
            valid = false;
        }

        const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(!regexEmail.test(this._target as unknown as string)){
            valid = false;
        }

        if(!valid)
            this._errors.push(message)
    }
}