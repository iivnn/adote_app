import ApiClass from "./base/ApiClass";

export default class Animal extends ApiClass<Animal>{
    constructor(
        public Name = ""    
    ){
        super(Animal);
    }
}