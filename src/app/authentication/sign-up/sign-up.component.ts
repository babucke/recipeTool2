import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { RepeatPasswordEStateMatcher, EmailValidation, PasswordValidation, RepeatPasswordValidator } from 'src/app/shared/services/authentication/validators';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  passwordsMatcher = new RepeatPasswordEStateMatcher;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      email: new FormControl('', EmailValidation),
      password: new FormControl('', PasswordValidation),
      passwordAgain: new FormControl(''),
      acceptTerms: new FormControl(false, [Validators.requiredTrue])
    }, { validator: RepeatPasswordValidator });
  }

  ngOnInit() { }
}
