import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorApiService } from 'src/app/services/doctor-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  token: string = JSON.parse(localStorage.getItem('user')).session.token

  profileForm: FormGroup
  saveProfileLoading: boolean = false
  saveProfileSuccessful: boolean = false

  constructor(private formBuilder: FormBuilder, private doctorApiService: DoctorApiService) { 
    this.profileForm = this.formBuilder.group({
      full_name: ['', Validators.required ],
      description: ['', Validators.required ],
      validation: [false]
    })
  }

  ngOnInit() {
    this.getProfile()
  }

  onChange(){
    console.log(this.profileForm.value.validation)
  }
  

  getProfile() {
    this.doctorApiService.getDoctor(this.token)
      .subscribe((response: any) => {
        this.profileForm.setValue({ 
          full_name: response.data.full_name, 
          description: response.data.description,  
          validation: response.data.validation
        })
      },
      error => {
        console.log(error)
      }
    )
  }

  saveProfile(profile) {
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
  }
}
