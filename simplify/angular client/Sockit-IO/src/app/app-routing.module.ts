import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SockitClintComponent } from './components/sockit-clint/sockit-clint.component';

const routes: Routes = [
  { path: 'sockit', component: SockitClintComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
