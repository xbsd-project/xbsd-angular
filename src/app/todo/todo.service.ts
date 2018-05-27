import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Todo} from './todo.model';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ApiRequestService} from '../xbsd/services/api-request.service';

@Injectable()
export class TodoService {

  private apiUrl = environment.todoApi;

  private todos: Todo[] = [];

  onTodosChangedSubject: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient,
              private apiRequest: ApiRequestService, //
  ) {
  }

  getRecords(page?: number, size?: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('page', typeof page === 'number' ? page.toString() : '1');
    params = params.append('size', typeof size === 'number' ? size.toString() : '10');

    let customerListSubject = new Subject<any>(); // Will use this subject to emit data that we want

    this.apiRequest.get('api/birthRecord/list', params)
      .subscribe(jsonResp => {
        customerListSubject.next(jsonResp.data);
        this.onTodosChangedSubject.next(jsonResp.data);
      });

    return customerListSubject;
  }

  getTodos() {

    return this.getTodosByParams();
  }

  getTodosByParams() {
    return this.http.get(this.apiUrl)
      .subscribe((todo) => { //
        this.onTodosChangedSubject.next(todo);
      });
  }

  getTodosByFilter() {

  }

  addTodo(todo) {
    this.http.post(this.apiUrl, {...todo}).subscribe(res => {
      this.onTodosChangedSubject.next(res);
    });
  }

  toggleTodo(todo) {

  }

}
