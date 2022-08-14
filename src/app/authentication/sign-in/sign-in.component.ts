import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { EmailValidation, PasswordValidation } from 'src/app/shared/services/authentication/validators';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) { 
    this.signInForm = this.formBuilder.group( {
      email: new FormControl('', EmailValidation),
      password: new FormControl('', PasswordValidation)
    })
  }
  ngOnInit() { }
}