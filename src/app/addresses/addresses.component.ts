import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  newItem: string = '';


  constructor(public afAuth: AngularFireAuth,public af: AngularFireDatabase) {
    this.items = af.list('/OfficeBuildings');
  }

  addNewItem(){
    this.items.push(this.newItem);
    this.newItem = '';
  }

  removeAddress(key:string){
    this.items.remove(key);
  }

  ngOnInit() {
  }

}
