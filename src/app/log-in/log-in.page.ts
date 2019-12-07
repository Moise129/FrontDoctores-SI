import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DoctorApiService } from '../services/doctor-api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  logo: string = '../assets/icon/logo.svg'
  
  logInForm: FormGroup
  rol_id: string = '1'
  logInFailed: boolean = false
  logInLoading: boolean = false

  constructor(private formBuilder: FormBuilder, private doctorApiService: DoctorApiService, private navController: NavController) { 
    this.logInForm = this.formBuilder.group({
      uid: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  ngOnInit() {

  }

  changeRol(event: any) {
    this.logInForm.reset()

    if(this.rol_id == '1') {
      this.rol_id = '2'
    }
    else if(this.rol_id == '2') {
      this.rol_id = '1'
    }
  }

  logIn(user) {
    this.logInLoading = true

    this.doctorApiService.postToken(user)
      .subscribe(response => {
        localStorage.setItem('user', JSON.stringify(response))
        this.navController.navigateRoot('')
      },
      error => {
        this.logInLoading = false
        this.logInFailed = true
        
        setTimeout(() => {
          this.logInFailed = false
        }, 2000)

        console.log(error)
      }
    )
  }
}
