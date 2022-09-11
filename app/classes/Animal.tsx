import { getActionFromState } from "@react-navigation/native";;
import HttpMethods from "./base/HttpMethods";
import Base from "./base/HttpMethods";

export default class Animal extends HttpMethods<Animal>{
    constructor(
        public Name = ""    
    ){
        super();
    }

}