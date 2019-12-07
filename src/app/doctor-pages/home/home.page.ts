import { Component } from '@angular/core';
import { DoctorApiService } from '../../services/doctor-api.service';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  appointments: any = []
  clinic: any = {}
  token: string = JSON.parse(localStorage.getItem('user')).session.token

  date: string = new Date().toISOString()
  months: string = 'Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre'
  times: string[] = []

  constructor(
    private doctorApiService: DoctorApiService, 
    public alertController: AlertController, 
    private router: Router
  ) 
  {
    this.getAppointments()
    this.getClinic()
  }

  getAppointments() {
    this.doctorApiService.getAppointmentsByDate(this.date, this.token)
      .subscribe((response: any) => {
        this.appointments = response.appointments
      },
      error => {
        console.log(error)
      }
    )
  }

  getClinic() {
    this.doctorApiService.getClinic(this.token)
      .subscribe((response: any) => {
        this.clinic = response.data
        
        let appointment_duration: number = Number(this.clinic.appointment_duration) 
        let clinic_open: number = Number(this.clinic.open.substring(0,2))
        let clinic_close: number = Number(this.clinic.close.substring(0,2))

        for(let hour = clinic_open; hour < clinic_close; hour++) {
          for(let minute = 0; minute < 59; minute += appointment_duration) {
            let time: string = ''
            if(hour < 10) time += '0'
            time += hour + ':' + minute
            if(minute == 0) time += '0'
            this.times.push(time)
          }
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  searchAppointment(time: string) {
    for(let appointment of this.appointments) {
      if(time == appointment.start.substr(0,5)) {
        return appointment
      }
    }
    return false
  }

  navigateAppointmentPage(time, i) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: { date: this.date, start: time, end: this.times[i+1] }
      }
    }
    this.router.navigate(['appointment'], navigationExtras)
  }

  async showAppointment(appointment: any, time: string, i: number) {
    const alert = await this.alertController.create({
      header: 'Cita (' + time + ' - ' + this.times[i+1] + ')',
      message: '<br> <ion-icon name="person"></ion-icon> ' + appointment.patient_id.full_name +
               '<br> <ion-icon name="call"></ion-icon> ' + appointment.patient_id.phone +
               '<br> <ion-icon name="clipboard"></ion-icon> ' + appointment.reason,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  dateChanged($event) {
    this.getAppointments()
  }
}
