import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {
  usersList: any = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsersList()
                          .subscribe((response) => {
                            this.usersList = response;
                            console.log(this.usersList);
                          });
  }
}
