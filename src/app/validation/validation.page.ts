import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DoctorApiService } from '../services/doctor-api.service';
import { NavController,AlertController} from '@ionic/angular';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.page.html',
  styleUrls: ['./validation.page.scss'],
})
export class ValidationPage implements OnInit {
  validationForm: FormGroup
  validationFailed: boolean = false
  validationLoading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private doctorApiService: DoctorApiService, 
    private navController: NavController,
    private alertCtrl: AlertController
  ) { 
    this.validationForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }

  ngOnInit() {
  }


  validation(user) {
    this.validationLoading = true
    /* this.doctorApiService.validationByMessage(user).subscribe(response => {
        localStorage.setItem('user', JSON.stringify(response))
        let validation = JSON.parse(JSON.stringify(response)).session.user.validation
        if(validation){
          this.navController.navigateRoot('/validation')
        }else{
          this.navController.navigateRoot('')
        }
        
      },
        error => {
          this.validationLoading = false
          this.validationFailed = true
          setTimeout(() => {
            this.validationFailed = false
          }, 2000)
          console.log(error)
        }
      ) */
  }
}
