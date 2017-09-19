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

  constructor(public afAuth:AngularFireAuth,public af:AngularFireDatabase,private uploadService: UploadimgService) {
    this.newPrd = new Product();
    this.cates = af.list('/ProductCategory');
    this.suppliers = af.list('/Supplers');
  }

  dropzoneState($event: boolean){
    this.dropzoneActive = $event;
  }

  handleDrop(fileList: FileList) {

    let fileIndex = _.range(fileList.length)
    
        _.each(fileIndex,(idx)=>{
          this.currentUpload = new Imgupload(fileList[idx],this.newPrd.category,this.newPrd.id);
          this.uploadService.pushUpload(this.currentUpload);
          //this.prdImgUrls = this.af.list(`zIMGTEMPURLS/${this.pCate}/${this.pID}`);
        })

    //this.currentUpload = new Imgupload(img,this.newPrd.category,this.newPrd.id);
    //this.uploadService.pushUpload(this.currentUpload);
  }

  ngOnInit() {
  }

}
