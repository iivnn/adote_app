import Creatable from "./base/Creatable";

export default class Animal extends Creatable<Animal>{
    constructor(
        public Name = ""    
    ){
        super(Animal);
    }
}