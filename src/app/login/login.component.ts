import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(private router:Router, private authentificationService: AuthentificationService){}

  ngOnInit(): void {
  }

  onLoginButton(){
    this.router.navigateByUrl('/');
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
  }
}
