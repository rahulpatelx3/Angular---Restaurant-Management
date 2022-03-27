import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup

  constructor(private formBuilder:FormBuilder,private _http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group(
      {
        email:[''],
        password:['']
      }
    )
  }

  //loginForm
  loginFormMethod(){
    this._http.get<any>("http://localhost:8080/signup").subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password;
      })
      if(user){
        alert("Login Successful 😍");
        this.router.navigate(['restaurent']);
        this.loginForm.reset();
      }
      else {
        alert("Invalid Credential 🤷‍♂️");
      }
    }, err=>{
      alert("Server Error 😫");
    })
  }
  
}
