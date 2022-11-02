import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(private bookService: BookService, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  public bookInstance:any;
  tags:any = [];
  bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    publishDate: new FormControl(''),
    description: new FormControl('')
  });

  ngOnInit(): void {
    this.bookService.getOne(`${this.route.snapshot.paramMap.get('id')}`).subscribe(
      (res) => {
        this.bookInstance = res;
        this.tags = this.bookInstance.tags;
        this.bookForm.controls['title'].setValue(this.bookInstance.title)
        this.bookForm.controls['author'].setValue(this.bookInstance.author)
        this.bookForm.controls['publishDate'].setValue(this.bookInstance.publishDate)
        this.bookForm.controls['description'].setValue(this.bookInstance.description)

        this.openSnackBar("Book Added Successfully here is a sumarry", "dismiss")
      },
      (err) => {
        console.log(err)
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
