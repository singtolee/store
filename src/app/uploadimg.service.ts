import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Imgupload } from './imgupload';

@Injectable()
export class UploadimgService {

  constructor(private db:AngularFireDatabase) { }

  pushUpload(imgupload: Imgupload){
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`PRODUCTIMAGES/${imgupload.category}/${imgupload.prdID}/${imgupload.file.name}`).put(imgupload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot){
      //uploading
      imgupload.progress = (uploadTask.snapshot.bytesTransferred/uploadTask.snapshot.totalBytes)*100;
    },
    function(error){
      //upload failed
      console.log(error);
    },
    function(){
      //upload success
      imgupload.url = uploadTask.snapshot.downloadURL;
      imgupload.name = imgupload.file.name;
    }
  );
    
  }

}
