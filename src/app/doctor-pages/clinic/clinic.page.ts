import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorApiService } from '../../services/doctor-api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.page.html',
  styleUrls: ['./clinic.page.scss'],
})
export class ClinicPage implements OnInit {
  clinic: any
  token: string = JSON.parse(localStorage.getItem('user')).session.token
  
  clinicForm: FormGroup
  saveClinicLoading: boolean = false
  saveClinicSuccessful: boolean = false

  constructor(private formBuilder: FormBuilder, private doctorApiService: DoctorApiService,) { 
    this.clinicForm = this.formBuilder.group({
      open: ['00:00', Validators.required ],
      close: ['23:00', Validators.required ],
      appointment_duration: ['', Validators.required ]
    })
  }

  ngOnInit() {
    this.getClinic()
  }

  getClinic() {
    this.doctorApiService.getClinic(this.token)
      .subscribe((response: any) => {
        this.clinic = response.data
        if (response.data){
          this.clinicForm.setValue({ 
            open: response.data.open, 
            close: response.data.close, 
            appointment_duration: response.data.appointment_duration 
          })
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  saveClinic(clinic) {
    this.saveClinicLoading = true

    if(this.clinic) {
      this.doctorApiService.putClinic(clinic, this.token)
        .subscribe(response => {
          this.saveClinicLoading = false
          this.saveClinicSuccessful = true
          
          setTimeout(() => {
            this.saveClinicSuccessful = false
          }, 3000)
        },
        error => {
          this.saveClinicLoading = false
          console.log(error)
        }
      )
    }
    else {
      this.doctorApiService.postClinic(clinic, this.token)
        .subscribe(response => {
          this.saveClinicLoading = false
          this.saveClinicSuccessful = true
          
          setTimeout(() => {
            this.saveClinicSuccessful = false
          }, 3000)
        },
        error => {
          this.saveClinicLoading = false
          console.log(error)
        }
      )
    }
  }
}