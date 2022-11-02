import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard'
import { ProfileComponent } from './components/profile/profile.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BooksListComponent } from './components/books-list/books-list.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home'])

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'new-book',
    component: CreateBookComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'book-detail/:id',
    component: BookDetailsComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'Books',
    component: BooksListComponent,
    ...canActivate(redirectToLogin)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
