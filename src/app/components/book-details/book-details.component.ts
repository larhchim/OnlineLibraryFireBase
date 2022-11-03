import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(private bookService: BookService, private route: ActivatedRoute, private _snackBar: MatSnackBar, private toast: HotToastService) { }

  public bookInstance:any;
  tags:any = [];
  bookid:any;
  bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    publishDate: new FormControl(''),
    description: new FormControl('')
  });

  ngOnInit(): void {
    this.bookid = this.route.snapshot.paramMap.get('id');
    this.bookService.getOne(`${this.bookid}`).subscribe(
      (res) => {
        this.bookInstance = res;
        this.tags = this.bookInstance.tags;
        this.bookForm.controls['title'].setValue(this.bookInstance.title);
        this.bookForm.controls['author'].setValue(this.bookInstance.author);
        this.bookForm.controls['publishDate'].setValue(this.bookInstance.publishDate);
        this.bookForm.controls['description'].setValue(this.bookInstance.description);

        this.openSnackBar("Book Details loaded Successfully here is a sumarry", "dismiss");
      },
      (err) => {
        throw new Error(err);
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
