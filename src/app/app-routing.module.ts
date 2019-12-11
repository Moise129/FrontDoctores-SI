import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [LoginGuard] },
  
  { path: 'log-in', loadChildren: './log-in/log-in.module#LogInPageModule', canActivate: [LoginGuard] },
  { path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInPageModule', canActivate: [LoginGuard] },
  
  { path: 'home', loadChildren: () => import('./doctor-pages/home/home.module').then( m => m.HomePageModule), canActivate: [LoginGuard] },
  { path: 'appointment', loadChildren: './doctor-pages/appointment/appointment.module#AppointmentPageModule', canActivate: [LoginGuard] },
  { path: 'reserved', loadChildren: './doctor-pages/reserved/reserved.module#ReservedPageModule', canActivate: [LoginGuard] },
  { path: 'clinic', loadChildren: './doctor-pages/clinic/clinic.module#ClinicPageModule' },
  { path: 'profile', loadChildren: './doctor-pages/profile/profile.module#ProfilePageModule' },
  { path: 'home-patient', loadChildren: './patient-pages/home/home.module#HomePageModule' },
  { path: 'profile-patient', loadChildren: './patient-pages/profile/profile.module#ProfilePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}