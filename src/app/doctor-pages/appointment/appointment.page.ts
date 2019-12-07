import { Component, OnInit } from '@angular/core';
import { DoctorApiService } from '../../services/doctor-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  clinic: any = {}
  token: string = JSON.parse(localStorage.getItem('user')).session.token

  appointmentForm: FormGroup
  appointment: any
  scheduleAppointmentLoading: boolean = false

  constructor(
    private doctorApiService: DoctorApiService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private navController: NavController
  ) 
  { 
    this.navController.setDirection('root')

    this.activatedRoute.queryParams
      .subscribe(params => {
        if(this.router.getCurrentNavigation().extras.state) {
          this.appointment = this.router.getCurrentNavigation().extras.state.data
        }
      }
    )

    this.appointmentForm = this.formBuilder.group({
      full_name: ['', Validators.required ],
      phone: ['', Validators.required ],
      reason: ['', Validators.required ]
    })
  }

  ngOnInit() {

  }

  scheduleAppointment(appointment) {
    this.scheduleAppointmentLoading = true

    this.doctorApiService.postPatient({ full_name: appointment.full_name, phone: appointment.phone }, this.token)
      .subscribe((response: any) => {
        this.doctorApiService.postAppointment({ date: this.appointment.date, start: this.appointment.start, end: this.appointment.end, reason: appointment.reason, patient_id: response.data.id }, this.token)
          .subscribe(response => {
            this.navController.navigateRoot('home')
          },
          error => {
            this.scheduleAppointmentLoading = false
            console.log(error)
          }
        )
      },
      error => {
        this.scheduleAppointmentLoading = false
        console.log(error)
      }
    )
  }
}