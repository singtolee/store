import { Component, OnInit } from '@angular/core';
import { Product } from './product';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  private newPrd:Product;

  constructor() {
    this.newPrd = new Product();
  }

  ngOnInit() {
  }

}
