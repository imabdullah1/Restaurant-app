import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { RestaurantData } from './restaruant.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-restaurentdash',
  templateUrl: './restaurentdash.component.html',
  styleUrls: ['./restaurentdash.component.css'],
})
export class RestaurentdashComponent implements OnInit {
  allRestaurantData: any;
  myGroup!: FormGroup;
  page: number = 1;
  totalLength: any;

  restaurantModelObj: RestaurantData = new RestaurantData();
  showAdd!: boolean;
  showbtn!: boolean;

  userFilter: any = { name: '' };

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.myGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      services: ['', Validators.required],
    });
  }

  getAllReso() {
    this.api.getRestaurant().subscribe((res: any) => {
      this.allRestaurantData = res;
      console.log(this.allRestaurantData);
    });
  }

  clickAddReso() {
    this.myGroup.reset();
    this.showAdd = true;
    this.showbtn = false;
  }

  addReso() {
    this.restaurantModelObj.name = this.myGroup.value.name;
    this.restaurantModelObj.email = this.myGroup.value.email;
    this.restaurantModelObj.mobile = this.myGroup.value.mobile;
    this.restaurantModelObj.address = this.myGroup.value.address;
    this.restaurantModelObj.services = this.myGroup.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(
      (res) => {
        this.toast.success({
          detail: 'Update Message',
          summary: 'Add Restaurant Data Successfully',
          duration: 3000,
        });
        this.myGroup.reset();
        this.getAllReso();
      },
      (err) => {
        alert('Something went Wrong');
      }
    );
  }

  deleteReso(data: any) {
    if (confirm('Are you sure to delete record?'))
      this.api.deleteRestaurant(data.id).subscribe((res) => {
        this.toast.info({
          detail: 'Delete Notification',
          summary: 'Record deleted sucessfully',
          duration: 4000,
        });
        this.getAllReso();
      });
  }

  onEditResto(data: any) {
    this.restaurantModelObj.id = data.id;
    this.showAdd = false;
    this.showbtn = true;

    this.myGroup.controls['services'].setValue(data.services);
    this.myGroup.controls['address'].setValue(data.address);
    this.myGroup.controls['mobile'].setValue(data.mobile);
    this.myGroup.controls['mobile'].setValue(data.mobile);
    this.myGroup.controls['name'].setValue(data.name);
  }

  updateResto() {
    this.restaurantModelObj.name = this.myGroup.value.name;
    this.restaurantModelObj.email = this.myGroup.value.email;
    this.restaurantModelObj.mobile = this.myGroup.value.mobile;
    this.restaurantModelObj.address = this.myGroup.value.address;
    this.restaurantModelObj.services = this.myGroup.value.services;

    this.api
      .updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'Update Message',
            summary: 'Update Successfully',
            duration: 3000,
          });

          this.myGroup.reset();
          this.getAllReso();
        },
        (err) => {
          alert('Something went Wrong ');
        }
      );
  }

  logout() {
    this.toast.success({
      detail: 'Update Message',
      summary: 'Logout Successfully',
      duration: 3000,
    });
  }
}
