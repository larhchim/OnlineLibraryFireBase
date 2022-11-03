import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  user = this.usersService.currentUserProfile;

  constructor(
    private usersService: UsersService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user.subscribe(
      (data) => {
        localStorage.setItem("uid", data?.uid ?? "");
      },
      (err) => {
        console.log(err);
      }
    );
    this.openSnackBar("Welcome Home User you are signed in", "dismiss");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
