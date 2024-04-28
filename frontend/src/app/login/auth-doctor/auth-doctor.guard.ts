import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DoctorService } from 'src/api/doctor.service';

@Injectable({
  providedIn: 'root'
})

export class AuthDoctorGuard implements CanLoad {
  constructor(private doctorService: DoctorService, private router: Router){}

  // prevent navigating to url if not properly logged in
  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('DoctorData') != null) {
      return true;
    }
    else if(!this.doctorService.docIsAuthenticated){
      this.router.navigateByUrl('/login/doctor');
    }
    return this.doctorService.docIsAuthenticated;
  }
}
