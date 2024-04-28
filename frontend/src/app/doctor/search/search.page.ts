import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from 'src/api/doctor.service';
import { UserService } from 'src/api/user.service';

export interface StaticData {
  name?: string;
  test1?: string;
  test2?: string;
  test3?: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {
  /*
    Please write your code for Task 3 here.
    For reference, you can look into the search functionality in user/search.
    A patient can search for doctors by entering a name or a specialization. The filtered
    results are displayed as cards with further information on the doctor.

    Current state:
      1) Patient types something in the input field
      2) Patient presses enter key
      3) Backend returns static data
  */

  myControl = new FormControl<string | StaticData>('');
  staticData: StaticData[] = [];

  constructor(private userService: UserService, private doctorService: DoctorService, private route: Router) { }

  ngOnInit() { }

  onSearchEnter() {
    const staticQuery = `SELECT 'name', 'test1', 'test2', 'test3' FROM user_patient WHERE 1 = 1 LIMIT 10;`;

    this.userService.executeStaticQuery({query: staticQuery}).subscribe((res)=>{
      const tmp = res.data;

      tmp.forEach((element: StaticData) => {
        this.staticData.push({name: element.name + ' (' + element.test1 + ')', test1: element.test1, test2: element.test2, test3: element.test3});
      });
    })
  }

  // display selected suggestion in the search input
  displayFn(selectedData: StaticData): string {
    return selectedData && selectedData.name ? selectedData.name : '';
  }

  onLogout(){
    this.doctorService.onLogout();
  }

  onProfile(){
    this.route.navigateByUrl('/user/profile');
  }

}
