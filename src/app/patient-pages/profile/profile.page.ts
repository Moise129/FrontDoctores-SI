import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup
  saveProfileLoading: boolean = false
  saveProfileSuccessful: boolean = false
  session:any;

  apiUrl: string = 'http://127.0.0.1:3333/api/v1' 

  constructor(private formBuilder: FormBuilder, private http:HttpClient) { 
    this.profileForm = this.formBuilder.group({
      full_name: ['', Validators.required ],
      telephone: ['', Validators.required ],
      email: ['', Validators.required ],
    })
    this.session = JSON.parse(localStorage.getItem('user')).session;
    this.getPatient();
  }

  ngOnInit() {
    
  }

  //Patient methods
  getPatient() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + this.session.token
		})
    this.http.get(this.apiUrl + '/patients/profile', { headers: headers }).subscribe( (res:any) => {
      this.profileForm.setValue({ 
        full_name: res.data[0].full_name,
        telephone: res.data[0].telephone,
        email: this.session.user.uid,
      })
      console.log(this.profileForm.value)
    })
  }

  saveProfile(profile) {
    this.saveProfileLoading = true
    console.log(this.profileForm.value)
  }

  /* saveProfile(profile) {
    this.saveProfileLoading = true

    this.doctorApiService.putDoctor(profile, this.token)
      .subscribe(response => {
        this.saveProfileLoading = false
        this.saveProfileSuccessful = true
        
        setTimeout(() => {
          this.saveProfileSuccessful = false
        }, 3000)
      },
      error => {
        this.saveProfileLoading = false
        console.log(error)
      }
    )
  } */

}
