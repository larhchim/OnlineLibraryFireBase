import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BibliothequeEnLigne';

  user$ = this.usersService.currentUserProfile;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private usersService: UsersService,
              private _snackBar: MatSnackBar){

  }

  logout(){
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('uid')
      this.router.navigate(['']);
      this.openSnackBar(
        "You Logged off Successfully",
        "dismiss"
      );
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
