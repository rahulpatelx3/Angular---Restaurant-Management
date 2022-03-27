import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentModel } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!:FormGroup

  restaurentModel:RestaurentModel= new RestaurentModel;
  getApiData: any;
  showAdd!:boolean;
  showBtn!:boolean;

  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:['']
    });
    this.fetchRestaurent();
  }

  //Subscribing data
  addRestaurent(){
    this.restaurentModel.name=this.formValue.value.name;
    this.restaurentModel.email=this.formValue.value.email;
    this.restaurentModel.mobile=this.formValue.value.mobile;
    this.restaurentModel.address=this.formValue.value.address;
    this.restaurentModel.services=this.formValue.value.services;

    this.api.postRestaurent(this.restaurentModel).subscribe((res: any)=>{
      console.log(res);
      alert("Restaurent Added Successfully");

      //clear after submitting data
      let ref=document.getElementById('clear');
      ref?.click();
      this.formValue.reset();

      //refreshing data
      this.fetchRestaurent();
    },(err: any)=>{
      alert("Restaurent Not Added");
    }
    )

  }

  //Fetching Data
  fetchRestaurent(){
    this.api.getRestaurent().subscribe(res=>{
      this.getApiData=res;
    });
  }

  //Removing Data
  removeRestaurent(data:any){
    this.api.deleteRestaurent(data.id).subscribe(res=>{
      alert("Data Deleted ID : "+data.id);
      //refreshing data
      this.fetchRestaurent();
    })
  }

  //Editing Restaurent
  editRestaurent(data:any){
    this.restaurentModel.id=data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);

    this.showAdd=false;
    this.showBtn=true;
  }

  //Updating Restaurent
  updateRestaurent(){
    this.restaurentModel.name=this.formValue.value.name;
    this.restaurentModel.email=this.formValue.value.email;
    this.restaurentModel.mobile=this.formValue.value.mobile;
    this.restaurentModel.address=this.formValue.value.address;
    this.restaurentModel.services=this.formValue.value.services;

    this.api.putRestaurent(this.restaurentModel,this.restaurentModel.id).subscribe(res=>{
      alert("Data Update ID : "+this.restaurentModel.id);
      //clear after submitting data
      let ref=document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      
      //refreshing data
      this.fetchRestaurent();
    })

  }

  //reset
  clickAddRestaurent(){
    this.formValue.reset();
    this.showAdd=true;
    this.showBtn=false;
  }

}


