//user model for registering
export class User{
    constructor(
        public username:string,
        public password:string,
        public email:string,
        public companyname:string,
        public requests:[]
    ){}
}

//user modlel for login
export class Userlog{
    constructor(
        public username:string,
        public password:string
    ){}
}

//importer model
export class Importer{
    constructor(
        public companyName:string,
        public typeOfBuss:string,
        public name:string,
        public emailId:string,
        public phone:number,
        public quoteStatus:string,
        public address:{
            city:string,
            country:string,
            pinCode:number
        },
    ){}
}