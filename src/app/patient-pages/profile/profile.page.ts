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

  constructor(private formBuilder: FormBuilder, http:HttpClient) { 
    this.profileForm = this.formBuilder.group({
      full_name: ['', Validators.required ],
      description: ['', Validators.required ]
    })
  }

  ngOnInit() {
  }

  getProfile() {
    let user = JSON.parse(localStorage.getItem('user'));
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
