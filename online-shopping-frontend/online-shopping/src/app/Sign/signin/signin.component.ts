import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  showFormValue : boolean = environment.showFormValue;
  signInForm: FormGroup;
  userModel: User = new User();
  
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout();

    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    let authenticated = false;

    if(this.signInForm.valid) {      
      this.authService.login(this.signInForm.value);
    }
  }

}
