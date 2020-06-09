import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './Sign/signin/signin.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
 
  { path: 'login', component: SigninComponent }
];

//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: 'login', component: SigninComponent },
//   { path: 'signup', component: SignupComponent },
//   { path: 'home', component: HomeComponent }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
