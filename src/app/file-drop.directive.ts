import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import * as _ from 'lodash';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {

  @Output() filesDropped = new EventEmitter<FileList>();
  @Output() filesHovered = new EventEmitter();

  constructor() { }
  
  @HostListener('drop', ['$event'])
  ondrop($event){
    $event.preventDefault();

    let transfer = $event.dataTransfer;
    this.filesDropped.emit(transfer.files);
    this.filesHovered.emit(false);
  }

@HostListener('dragover',['$event'])
  ondragover($event){
    event.preventDefault();
    this.filesHovered.emit(true);
  }

@HostListener('dragleave',['$event'])
  ondragleave($event){
    this.filesHovered.emit(false);
  }

}
