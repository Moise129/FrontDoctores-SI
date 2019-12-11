import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DoctorApiService } from '../services/doctor-api.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  forgotPassword = 0
  forgotPasswordFailed: boolean = false
  ForgotPasswordForm: FormGroup

  validationActive = 0

  logo: string = '../assets/icon/logo.svg'
  logInForm: FormGroup
  rol_id: string = '1'
  logInFailed: boolean = false
  logInLoading: boolean = false

  validationForm: FormGroup
  validationFailed: boolean = false
  validationLoading: boolean = false

  user: any
  code: any

  constructor(
    private formBuilder: FormBuilder,
    private doctorApiService: DoctorApiService,
    private navController: NavController,
    private alertCtrl: AlertController) {
    this.logInForm = this.formBuilder.group({
      uid: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.ForgotPasswordForm = this.formBuilder.group({
      uid: ['', Validators.compose([Validators.required, Validators.pattern(this.validEmail)])],
    });
    this.validationForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  changeRol(event: any) {
    this.logInForm.reset()

    if (this.rol_id == '1') {
      this.rol_id = '2'
    }
    else if (this.rol_id == '2') {
      this.rol_id = '1'
    }
  }

  logIn(user) {
    this.logInLoading = true
    this.doctorApiService.postToken(user)
      .subscribe( (response:any) => {
        this.user = JSON.stringify(response)
        let validation = JSON.parse(JSON.stringify(response)).session.user.validation
        let token = JSON.parse(JSON.stringify(response)).session.token
        console.log(token)
        if (validation == true) {
          this.code = Math.round(Math.random() * 9999 + 1001)
          localStorage.setItem('code', this.code)
          this.doctorApiService.sendMessage(this.code, token).subscribe(response => {
            console.log("Mensaje enviado")
          })
          this.validationActive = 1
        } else {
          localStorage.setItem('user', this.user)
          
          if(response.session.user.rol_id == 1) 
            this.navController.navigateRoot('')
          else
            this.navController.navigateRoot('home-patient')
        }
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


  forgotPasswordByEmail(email) {
    this.logInLoading = true
    this.doctorApiService.forgotPassword(email).subscribe(response => {
      this.alert()
    }, error => {
      this.logInLoading = false
      this.forgotPasswordFailed = true
      setTimeout(() => {
        this.forgotPasswordFailed = false
      }, 2000)
      console.log(error)
    }
    )
  }
  change_status(status: any) {
    this.forgotPassword = status
  }
  async alert() {
    let alerta = await this.alertCtrl.create({
      header: 'Accion correcta',
      message: 'Comprueba su correo lectronico. Se le ha enviado un link para recuperar su contraseña.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.forgotPassword = 0
            this.logInLoading = false
          }
        }
      ]
    });
    await alerta.present();
  }

  async validation(formCode) {
    this.validationLoading = true
    let code_s: string = JSON.parse(localStorage.getItem('code'))
    let code = this.validationForm.value.code
    console.log(code_s, " === ", code)
    if (code_s == code) {
      console.log("Validacion correcta")
      let alerta = await this.alertCtrl.create({
        header: 'Codigo correcto',
        message: 'Su cuenta se ha validado correctamente',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              localStorage.setItem('user', this.user)
          
            if(this.user.session.user.rol_id == 1)
              this.navController.navigateRoot('')
            else
              this.navController.navigateRoot('home-patient')
            }
          }
        ]
      });
      await alerta.present();

    } else {
      this.validationLoading = false
      this.validationFailed = true
      setTimeout(() => {
        this.validationFailed = false
      }, 2000)
    }
  }

  returned(status) {
    this.validationActive = status
  }
}
