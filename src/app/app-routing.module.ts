import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentItemListComponent } from './components/content-item-list/content-item-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: ContentItemListComponent },

  { path: '**', redirectTo: 'inicio'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
