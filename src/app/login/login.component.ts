import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  state:string='';
  error:any;
  //why have to add these two var
  email:string;
  password:string;

  constructor(private afAuth:AngularFireAuth,private router:Router){
    this.afAuth.authState.subscribe(
      auth =>{
        if(auth){
          this.router.navigate(['/console']);
        }
      }
    );
  }

  onSubmit(formData){
    if(formData.valid){
      this.afAuth.auth.signInWithEmailAndPassword(formData.value.email,formData.value.password)
      .then((success)=>{
        this.router.navigate(['/console']);
      }).catch(
        (err)=>{
          this.error=err;
        }
      )
    }
  }

  ngOnInit() {
  }

}
