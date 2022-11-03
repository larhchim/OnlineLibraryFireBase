import { Component, OnInit } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Book } from "src/app/models/book.model";
import { BookService } from "src/app/services/book-service.service";
import { HotToastService } from "@ngneat/hot-toast";
import { Router } from "@angular/router";

export interface Tag {
  name: string;
}

@Component({
  selector: "app-create-book",
  templateUrl: "./create-book.component.html",
  styleUrls: ["./create-book.component.css"],
})
export class CreateBookComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];
  bookInstance: Book = new Book();

  bookForm = new FormGroup({
    title: new FormControl("", Validators.required),
    author: new FormControl("", Validators.required),
    publishDate: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
  });

  constructor(
    private bookService: BookService,
    private toast: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our fruit
    if (value) {
      this.tags.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  saveBook(): void {
    console.log(this.bookForm);
    console.log(this.tags);

    if (!this.bookForm.valid) {
      return;
    }

    const { title, author, publishDate, description } = this.bookForm.value;

    this.newBook();

    this.bookInstance.author = author;
    this.bookInstance.description = description;
    this.bookInstance.publishDate = publishDate;
    this.bookInstance.title = title;
    this.bookInstance.tags = this.tags;

    this.bookService
      .create(this.bookInstance)
      .pipe(
        this.toast.observe({
          success: "Book added successfully",
          loading: "Uploading Data...",
          error: "There was an error in Uploading Data",
        })
      )
      .subscribe((data) => {
        this.router.navigate(["/book-detail", data._delegate._path.pieces_[1]]);
      });
  }

  newBook(): void {
    this.bookInstance = new Book();
  }
}
