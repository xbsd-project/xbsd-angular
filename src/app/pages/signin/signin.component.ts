import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../../xbsd/services/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  userForm: FormGroup;
  formErrors = {
    email: '',
    password: ''
  };
  validationMessages = {
    email: {
      required: '请输入您的邮箱',
      email: '请输入正确的邮箱'
    },
    password: {
      required: '请输入您的密码',
      pattern: '密码中必须包含数字和字母',
      minlength: '请输入大于4个字符',
      maxlength: '请输入小于25个字符'
    }
  };

  constructor(private router: Router,
              private fb: FormBuilder,
              private loginService: LoginService,) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.pattern(".*"),
          Validators.minLength(1),
          Validators.maxLength(25)
        ]
      ]
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  signInWithGoogle() {
    // pass
    console.log('sign in with Google');
  }

  signInWithGithub() {
    console.log('sign in with GitHub');
  }

  signInWithEmail() {
    // this.auth
    //   .emailLogin(this.userForm.value['email'], this.userForm.value['password'])
    //   .catch(error => console.log('邮箱登录出错：', error));

    this.loginService.getToken(this.userForm.value['email'], this.userForm.value['password'])
      .subscribe(landing => {
          this.router.navigate([landing]);
        },
        err => {
          console.log(err);
        }
      );
  }

  signInAnonymously() {
    console.log('sign in with Anonymously');
  }

  login() {
    this.signInWithEmail();
  }

  private afterSignIn() {
    this.router.navigate(['/']);
  }
}
