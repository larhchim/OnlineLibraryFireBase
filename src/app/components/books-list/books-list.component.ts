import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BookService } from "src/app/services/book-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-books-list",
  templateUrl: "./books-list.component.html",
  styleUrls: ["./books-list.component.css"],
})
export class BooksListComponent implements OnInit {
  public array: any;

  filterValues = {};

  constructor(
    private bookService: BookService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {}

  booksList: any;

  ELEMENT_DATA: BookElement[] = [];

  displayedColumns: string[] = [
    "position",
    "reference",
    "author",
    "description",
    "publishDate",
    "title",
    "action",
  ];
  dataSource: any;

  // Object to create Filter for
  filterSelectObj = [
    {
      name: "ID",
      columnProp: "position",
      options: [],
    },
    {
      name: "REF",
      columnProp: "reference",
      options: [],
    },
    {
      name: "AUTHOR",
      columnProp: "author",
      options: [],
    },
    {
      name: "DESCRIPTION",
      columnProp: "description",
      options: [],
    },
    {
      name: "DATE",
      columnProp: "publishDate",
      options: [],
    },
    {
      name: "TITLE",
      columnProp: "title",
      options: [],
    },
  ];

  ngOnInit(): void {
    this.bookService.getAll().subscribe(
      (res) => {
        this.booksList = res;

        const keys = Object.keys(this.booksList);

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          var json = {
            position: i + 1,
            reference: key,
            author: this.booksList[key].author,
            description: this.booksList[key].description,
            publishDate: this.booksList[key].publishDate,
            title: this.booksList[key].title,
          };
          this.ELEMENT_DATA.push(json);
          this.dataSource = new MatTableDataSource<BookElement>(
            this.ELEMENT_DATA
          );
          this.dataSource.filterPredicate = this.createFilter();
          this.dataSource.paginator = this.paginator;

          this.filterSelectObj.filter((o) => {
            o.options = this.getFilterObject(this.ELEMENT_DATA, o.columnProp);
          });

          this.openSnackBar(
            "List of Books has been loaded Successfully",
            "dismiss"
          );
        }
      },
      (err) => {
        throw new Error(err);
      }
    );
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {}

  showDetail(link) {
    this.route.navigate(["/book-detail", link]);
  }

  // Called on Filter change
  filterChange(filter, event) {
    //let filterValues = {}
    this.filterValues[filter.columnProp] = event.target.value
      .trim()
      .toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== "") {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col]
              .trim()
              .toLowerCase()
              .split(" ")
              .forEach((word) => {
                if (
                  data[col].toString().toLowerCase().indexOf(word) != -1 &&
                  isFilterSet
                ) {
                  found = true;
                }
              });
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }

  // Get Unique values from columns to build filter
  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

export interface BookElement {
  position: number;
  reference: string;
  author: string;
  description: string;
  publishDate: string;
  title: string;
}
