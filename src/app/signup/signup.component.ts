import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!:FormGroup

  constructor(private formBuilder:FormBuilder,private _http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group(
      {
        name:[''],
        email:[''],
        mobile:[''],
        password:['']
      }
    )
  }

  //signupForm
  signupFormMethod(){
    this._http.post<any>("http://localhost:8080/signup",this.signupForm.value).subscribe(res=>{
      alert("Registration Successful 😍");
      
      //clearing the form
      this.signupForm.reset();

      //navigate to login
      this.router.navigate(["login"]);
    }, err=>{
      alert("Registration Unsuccessful 😢");
    }
    )
  }
}
