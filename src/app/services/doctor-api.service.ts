import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorApiService {
  //apiUrl: string = 'https://doctorapp-api.herokuapp.com/api/v1'

  apiUrl: string = 'http://127.0.0.1:3333/api/v1'
  constructor(private http: HttpClient) { 
  }


  //Forgot password
  forgotPassword(email: any) {
    console.log(email)
    return this.http.post(this.apiUrl + '/users/forgot_password', email)
  }

  //User methods
  postToken(user: any) {
    return this.http.post(this.apiUrl + '/tokens', user)
  }


  postUser(user: any) {
    return this.http.post(this.apiUrl + '/users', user)
  }


  //Appointment methods
  getAppointmentsByDate(date: string, token: string) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + token
		})
    return this.http.get(this.apiUrl + '/appointments/date/' + date, { headers: headers })
  }


  postAppointment(appointment: any, token: string) {
    let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + token
		})
    return this.http.post(this.apiUrl + '/appointments', appointment, { headers: headers })
  }


  //Clinic methods
  getClinic(token: string) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + token
		})
    return this.http.get(this.apiUrl + '/clinics', { headers: headers })
  }


  postClinic(clinic: any, token: string) {
    let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + token
		})
    return this.http.post(this.apiUrl + '/clinics', clinic, { headers: headers })
  }

  
  putClinic(clinic: any, token: string) {
    let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + token
		})

    return this.http.put(this.apiUrl + '/clinics', clinic, { headers: headers })
  }


  //Patient methods
  postPatient(patient: any, token: string) {
    let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + token
		})

    return this.http.post(this.apiUrl + '/patients', patient, { headers: headers })
  }


  //Patient methods
  getDoctor(token: string) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + token
		})

    return this.http.get(this.apiUrl + '/doctors/1', { headers: headers })
  }

  putDoctor(doctor: any, token: string) {
    let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + token
		})

    return this.http.put(this.apiUrl + '/doctors', doctor, { headers: headers })
  }
}