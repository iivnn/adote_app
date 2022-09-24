export default class AdoteApp<T>{
    constructor(
        public message: Message,
        public data: T,
        public success: boolean
    ){
    }
}

export class Message{
    constructor(
        public title: string,
        public text: string,
        public type: string
    ){
    }
}
