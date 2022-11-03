import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {    
    this.openSnackBar("Welcome To the main Page Again If you need to Sign In/SignUp/Visit Profile click Top Right", "dismiss");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
