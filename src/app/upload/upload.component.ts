import { Component, OnInit } from '@angular/core';
import { Product } from './product';

import { Imgupload } from '../Imgupload';

import { UploadimgService } from '../uploadimg.service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as _ from "lodash";
import * as firebase from 'firebase';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  dropzoneActive: boolean = false;
  currentUpload: Imgupload;

  cates: FirebaseListObservable<any[]>;
  suppliers: FirebaseListObservable<any[]>;

  private newPrd:Product;

  private cs="";
  private qty=0;

  constructor(public afAuth:AngularFireAuth,public af:AngularFireDatabase,private uploadService: UploadimgService) {
    this.newPrd = new Product();
    this.cates = af.list('/ProductCategory');
    this.suppliers = af.list('/Supplers');

    this.currentUpload = new Imgupload();
  }

  dropzoneState($event: boolean){
    this.dropzoneActive = $event;
  }

  handleDrop(fileList: FileList) {
    //this.currentUpload = new Imgupload(fileList[0],this.newPrd.category,this.newPrd.id);
    this.currentUpload.file = fileList[0];
    this.currentUpload.category = this.newPrd.category;
    this.currentUpload.prdID = this.newPrd.id;
    this.uploadService.pushUpload(this.currentUpload);
  }

  addCS2Array(cs:string,qty:number,url:string){
    //console.log(cs,qty,url);
    this.newPrd.CS.push(cs);
    this.cs="";
    this.newPrd.QTY.push(qty);
    this.qty=0;
    this.newPrd.images.push(url);
    //console.log(this.newPrd);
  }

  add2InfoImg(url:string){
    this.newPrd.infoImages.push(url);
  }

  deleteImgByUrl(url:string){
    let imgRef = firebase.storage().refFromURL(url);
    imgRef.delete().then(()=>{
      this.currentUpload.url="";
    }).catch(error=>console.log(error));
  }

  removeFromArray(index:number){

    //console.log(index);

    let imgRef=firebase.storage().refFromURL(this.newPrd.images[index]);
    imgRef.delete().then(()=>{
      console.log(index);
      this.newPrd.images.splice(index,1);
      this.newPrd.CS.splice(index,1);
      this.newPrd.QTY.splice(index,1);
    }).catch(error=>console.log(error));
  }

  removeInfoImgArray(index:number){
    let imgRef = firebase.storage().refFromURL(this.newPrd.infoImages[index]);
    imgRef.delete().then(()=>{
      this.newPrd.infoImages.splice(index,1);
    }).catch(error=>console.log(error));
  }

  savefullPrd(){
    //short version product info
    var shortPrd = {
      productMainImage:this.newPrd.images[0],
      productName:this.newPrd.name,
      productPrice:this.newPrd.price,
      productSubDetail:this.newPrd.descrp
    };
    //generate a new key for the new product
    var newKey = firebase.database().ref().child('AllProduct').push().key;

    var updates = {};
    updates['AllProduct/' + newKey] = this.newPrd;
    updates['Each_Category/' + this.newPrd.category + '/' + newKey] = shortPrd;
    updates['Each_Suppler/' + this.newPrd.supplier + '/' + newKey] = shortPrd;

    //save to three folders simultaneously
    return firebase.database().ref().update(updates);
  }

  ngOnInit() {
  }

}
