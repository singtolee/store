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
    console.log(cs,qty,url);
    this.newPrd.CS.push(cs);
    this.cs="";
    this.newPrd.QTY.push(qty);
    this.qty=0;
    this.newPrd.images.push(url);
    console.log(this.newPrd);
  }

  ngOnInit() {
  }

}
