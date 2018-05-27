import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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
              private registerService: RegisterService,) {
  }

  ngOnInit() {
  }

  signUpWithEmail() {
    console.log(this.email, this.password);

    let that: SignupComponent = this;

    this.registerService
      .doRegister(this.email, this.name, this.password)
      .subscribe((json) => {
        that.afterSignIn();
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
    this.router.navigate(['/signin']);
  }
}
