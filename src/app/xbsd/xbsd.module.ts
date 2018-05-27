import {NgModule} from '@angular/core';
import {UserInfoService} from './services/user-info.service';
import {RegisterService} from './services/register.service';
import {ApiRequestService} from './services/api-request.service';
import {AppConfig} from './app-config';
import {LoginService} from './services/login.service';


@NgModule({
  providers: [
    UserInfoService, //
    RegisterService, //
    ApiRequestService, //
    AppConfig, //
    LoginService //
  ]
})
export class XbsdModule {
}
