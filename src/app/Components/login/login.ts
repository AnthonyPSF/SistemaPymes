import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
isLogin: boolean = true;  // true = login, false = signup

  loginForm: FormGroup;
  signupForm: FormGroup;
  showPwd = false;




  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  switchForm(toLogin: boolean) {
    this.isLogin = toLogin;
  }

  submitLogin() {
    if (this.loginForm.valid) {
      console.log('Login data', this.loginForm.value);
    }
  }

  submitSignup() {
    if (this.signupForm.valid) {
      console.log('Signup data', this.signupForm.value);
    }
  }
  togglepassword(){
    this.showPwd =!this.showPwd
  }
}
