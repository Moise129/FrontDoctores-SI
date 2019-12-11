import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(private navController: NavController) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userLocal = JSON.parse(localStorage.getItem('user'));
    console.log(userLocal.session.user.rol_id)
    console.log("home guard")
    if(userLocal.session.user.rol_id == 1)    
      this.navController.navigateRoot('home')
    else
      this.navController.navigateRoot('home-patient')
    
      return true
  }
  
}


