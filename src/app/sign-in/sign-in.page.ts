import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DoctorApiService } from '../services/doctor-api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  validPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i;
  logo: string = '../assets/icon/logo.svg'
  
  signInForm: FormGroup
  rol_id: string = '1'
  signInFailed: boolean = false
  signInFailedMessage: string = ''
  signInLoading: boolean = false

  constructor(private formBuilder: FormBuilder, private doctorApiService: DoctorApiService, private navController: NavController) { 
    this.signInForm = this.formBuilder.group({
      uid: ['', Validators.required ],
      password: ['', Validators.compose([Validators.required, Validators.pattern(this.validPassword)])], 
      full_name: ['', Validators.required ],
      institution: [''],
      telephone: [''],
      rol_id: ['']
    });
  }

  ngOnInit() {

  }

  changeRol(event: any) {
    if(this.rol_id == '1') {
      this.rol_id = '2'
    }
    else if(this.rol_id == '2') {
      this.rol_id = '1'
    }

    this.signInForm.reset()
  }

  signIn(user) {
    this.signInForm.value.rol_id = this.rol_id
    this.signInLoading = true
    
    this.doctorApiService.postUser(user)
      .subscribe(response => {
        console.log(response)
        this.navController.navigateRoot('log-in')
      },
      error => {
        this.signInLoading = false
        this.signInFailed = true
        this.signInFailedMessage = error.error.message
        
        setTimeout(() => {
          this.signInFailed = false
        }, 2000)
        console.log(error)
      }
    )
  }
}