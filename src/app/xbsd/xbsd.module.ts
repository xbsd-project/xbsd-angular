import {NgModule} from '@angular/core';
import {UserInfoService} from './services/user-info.service';
import {RegisterService} from './services/register.service';
import {ApiRequestService} from './services/api-request.service';
import {AppConfig} from './app-config';


@NgModule({
  providers: [UserInfoService, RegisterService, ApiRequestService, AppConfig]
})
export class XbsdModule {
}
