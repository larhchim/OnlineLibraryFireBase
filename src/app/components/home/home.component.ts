import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = this.usersService.currentUserProfile;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.user.subscribe(
      (data) => {
        localStorage.setItem('uid',data?.uid ?? '')
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
