import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getUsersList() {
        return this.http.get('http://localhost:3000/api/users');
    }

    createUser(user: any) {
        return this.http.post('http://localhost:3000/api/users', user);
    }
}
