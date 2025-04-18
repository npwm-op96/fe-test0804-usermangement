import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { ApiResponse } from '../models/apiResponse';
import { loginSuccess } from '../store/auth/auth.actions';
import { AuthState } from '../models/auth';
import { UserInfo } from '../models/UserInfo';
import { loadUsersSuccess } from '../store/user/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:1444/api/users'; // Your backend API URL

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {

    const headers = new HttpHeaders({
      'x-test-token': 'test0804',
      'Content-Type': "application/json",
    });

    return this.http.post<ApiResponse>(`${this.apiUrl}/login`, user, { headers }).pipe(
      map(response => {
        const authState: AuthState = mapApiResponseToAuthState(response);
        console.log('authState', authState)
        return loginSuccess({ authState });
      }),
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }


  getUsers(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`, { params }).pipe(
      map(res => {
        const data = mapApiResponseUserState(res)
        return loadUsersSuccess({ users:data.users,totalElements:data.totalElements })
      })
    )
  }
  getUserById(id: string): Observable<any> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }


  createUser(user: User): Observable<UserInfo> {
    return this.http.post<UserInfo>(`${this.apiUrl}`, user);

  }

  updateUser(user: User): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

export function mapApiResponseToAuthState(res: ApiResponse): AuthState {
  const apiResponse = res.data
  console.log('mapApiResponseToAuthState', apiResponse)
  return {
    token: apiResponse.token ?? null,
    user: apiResponse.user ?? null,
    error: apiResponse.error ?? null
  };
}
export function mapApiResponseUserState(res: ApiResponse): any {
  const users = res.data
  const totalElements = res.totalElements;  // Get the total number of users (for pagination)

  // console.log('mapApiResponseToAuthState', apiResponse)

  return loadUsersSuccess({ 
    users: users,  // List of users
    totalElements: Number(totalElements)  // Total number of elements (for pagination)
  });}
