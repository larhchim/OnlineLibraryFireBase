import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, from } from 'rxjs';
import { Book } from '../models/book.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  user$ = this.usersService.currentUserProfile;

  private dbPath = '/books-'+ this.Uid();

  booksRef: AngularFireList<Book>;

  constructor(private usersService: UsersService, private db: AngularFireDatabase) { 
    this.booksRef = db.list(this.dbPath);
  }

  getOne(id: string) {
    return this.db.object(`${this.dbPath}`+ "/"+ id).valueChanges();
  }

  getAll(): AngularFireList<Book> {
    return this.booksRef;
  }

  create(book: Book): Observable<any> {
    return from(this.booksRef.push(book));
  }

  update(key: string, value: any): Promise<void>{
    return this.booksRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.booksRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.booksRef.remove();
  }

  Uid(){
    return localStorage.getItem('uid');
  }

}
