export class Product{
    constructor (
        public _id:string,
        public title:string,
        public image:string,
        public discription:string,
        public cost:number,
        public madein:string,
        public manufacturer:string,
        public sellername:string
    ){}
}