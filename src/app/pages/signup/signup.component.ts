import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth.service';
import {RegisterService} from '../../xbsd/services/register.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  name: string;
  email: string;
  password: string;
  passwordConfirm: string;

  constructor(private router: Router,
              private registerService: RegisterService,
              private auth: AuthService) {
  }

  ngOnInit() {
  }

  signUpWithEmail() {
    console.log(this.email, this.password);

    // this.auth.emailSignUp(this.email, this.password).then(() => this.afterSignIn());

    this.registerService
      .doRegister(this.email, this.name, this.password)
      .subscribe((json) => {
          console.log(json);
        },
        err => {
          console.log(err);
        }
      );
  }

  register() {
    this.signUpWithEmail();
  }

  private afterSignIn() {
    this.router.navigate(['/']);
  }
}
