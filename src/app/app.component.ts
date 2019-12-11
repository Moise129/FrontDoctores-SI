import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navController: NavController,
    private menuController: MenuController
  ) 
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  isLoggedIn() {
    return localStorage.getItem('user')
  }

  logOut() {
    localStorage.removeItem('user')
    this.menuController.close('menu')
    this.navController.navigateRoot('log-in')
  }

  navigatePage(url: string) {
    this.menuController.close('menu')
    this.navController.navigateRoot(url)
  }

  getUserRole(){
    let session = JSON.parse(localStorage.getItem('user')).session
    return session.user.role_id;
  }
}