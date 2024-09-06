import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formValue!: FormGroup;
  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.formValue = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.http.get<any[]>('http://localhost:3000/signup').subscribe(
      (res) => {
        console.log(res, 'Result');

        const { email, password } = this.formValue.value;
        const user = res.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          this.toast.success({
            detail: 'Success message',
            summary: 'User login Successfully',
            duration: 3000,
          });
          this.formValue.reset();
          this.router.navigate(['/restaurent']);
          localStorage.setItem(
            'token',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
          );

          this.formValue.value.email
            ? localStorage.setItem('usertype', 'employee')
            : '';
        } else {
          this.toast.error({
            detail: 'Error Message',
            summary: 'user not found with these credentials',
            duration: 5000,
          });
        }
      },
      (err) => {
        this.toast.warning({
          detail: 'Error Message',
          summary: 'Something went wrong ',
          duration: 5000,
        });
      }
    );
  }
}
