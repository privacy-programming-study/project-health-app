import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/api/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthUserGuard implements CanLoad {
  constructor(private route: Router, private userService: UserService){}
  
  // prevent navigating to url if not properly logged in
  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('userData') != null) {
      return true;
    }
    else if(!this.userService.userIsAuthenticated){
      this.route.navigateByUrl('/login/user');
    }
    return this.userService.userIsAuthenticated;
  }
}
