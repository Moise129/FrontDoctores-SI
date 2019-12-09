import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DoctorApiService } from '../services/doctor-api.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  logo: string = '../assets/icon/logo.svg'
  forgotPasswordForm: FormGroup
  forgotPasswordFailed: boolean = false
  forgotPasswordLoading: boolean = false
  token:any
  email:any

  constructor(
    private formBuilder: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private doctorApiService: DoctorApiService,
    private navController: NavController,
    private alertCtrl: AlertController
  ) { 
    this.forgotPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required]
    });
    this.token = this.rutaActiva.snapshot.params.token,
    this.email = this.rutaActiva.snapshot.params.email
    console.log(this.token, "    ",this.email)
  }

  ngOnInit() {
  }

  updatePassword(newPassword) {
    console.log(newPassword)
    this.forgotPasswordLoading = true
    this.doctorApiService.updatePassword(this.token,this.email,newPassword).subscribe(response => {
      this.navController.navigateRoot('/log-in')
    }, error => {
      this.forgotPasswordLoading = false
      this.forgotPasswordFailed = true
      setTimeout(() => {
        this.forgotPasswordFailed = false
      }, 2000)
      console.log(error)
    }
    )
  }

}
