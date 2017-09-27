export class Product{
    name:string;
    id:string;
    descrp:string;
    price:number=0;
    pack:string;
    isRefundable:boolean;
    supplier:string;
    category:string="Accessories";

    //cs, qty. images, info-imgs Arrays

    QTY:number[]=[];
    CS:string[]=[];
    images:string[]=[];
    infoImages:string[]=[];
}