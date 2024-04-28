import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginUser, User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
    private userUrl = 'http://localhost:3000/user';

    private userToken = localStorage.getItem("userData");
    httpOptionsWithToken: { header: HttpHeaders } = {
        header: new HttpHeaders().set("Authorization",this.userToken)
    };

    httpOptions : { headers: HttpHeaders } = {
        headers : new HttpHeaders({"Content-Type": "application/json"}),
    };

    private _userIsAuthenticated = false;

    constructor(private _http: HttpClient, private route: Router, private alertController: AlertController) { }

    // create new user/patient account
    createUser(data: User): Observable<any> {
        return this._http.post(`${this.userUrl}`, data).pipe(catchError(this.handleError));
    }

    // get all users/patients in the system
    getUsersAll(): Observable<any> {
        return this._http.get(`${this.userUrl}`);
    }

    // get user/patient by token
    getUserByToken(): Observable<any> {
        return this._http.get(`${this.userUrl}/profile`, {headers:this.httpOptionsWithToken.header});
    }

    // get user/patient by id
    getUserById(userId: number): Observable<any> {
        return this._http.get(`${this.userUrl}/${userId}`);
    }

    // edit user/patient with given id
    editUser(userId: number, data: User){
        return this._http.put(`${this.userUrl}/edit/${userId}`, data);
    }

    // user/patient logs in
    onLogin(loginData : LoginUser): Observable<any>{
        return this._http.post(`${this.userUrl}/login`, loginData, this.httpOptions).pipe(
          tap(resData => {
            if(resData['success'] != 0) {
                this._userIsAuthenticated = true;
                localStorage.setItem("userData", JSON.stringify(resData));
                this.userToken = localStorage.getItem("userData");
                this.httpOptionsWithToken = {
                    header: new HttpHeaders().set("Authorization",this.userToken)
                };

                if(resData['role'] === "PATIENT") {
                    this.route.navigateByUrl('/user/dashboard');
                }
                else if (resData['role'] === "ADMIN") {
                    this.route.navigateByUrl('/admin');
                }
            }
            else {
              this.presentInvalidCred();
            }
          })
        );
    }

    executeStaticQuery(query: {}): Observable<any> {
        return this._http.post(`${this.userUrl}/static`, query);
    }

    // user/patient logs out
    onLogout() {
        localStorage.removeItem("userData");
        this._userIsAuthenticated = false;
        this.route.navigateByUrl('/login/user').then(() => {
            window.location.reload();
        });
    }

    get userIsAuthenticated(){
        return this._userIsAuthenticated;
      }
    
    // present alert if email or password invalid
    async presentInvalidCred() {
        const alert = await this.alertController.create({
            message: 'Invalid Email and password',
            buttons: ['OK']
        });
        await alert.present();
    }

    handleError(error){
        return throwError(error.message || "Server Error")
    }

}
