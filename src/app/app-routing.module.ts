import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './pages/admin/admin.component';
import { FormComponent } from './pages/admin/form/form.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/form', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
