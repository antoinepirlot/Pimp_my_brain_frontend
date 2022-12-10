import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
  notification = ""
  allOptions = ["PHP", "Python", "SQL"] // TODO : ask categories to the backend
  createCourseForm = new FormGroup({
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    optionChosen: new FormControl(this.allOptions[0], Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });


  onSubmit() {
    //verify that there is no empty field
    if (this.createCourseForm.value.country?.trim().length == 0 ||
      this.createCourseForm.value.city?.trim().length == 0 ||
      this.createCourseForm.value.optionChosen?.trim().length == 0 ||
      this.createCourseForm.value.description?.trim().length == 0 ||
      this.createCourseForm.value.price?.length===0
    ) {
      this.notification = "Vous devez remplir tous les champs du formulaire"
      return;
    }
    if(Number.isNaN(Number(this.createCourseForm.value.price))) {
      this.notification = "Vous devez entrer un nombre dans le champ prix"
      return;
    }
    //TODO : call the backend to add course
    //TODO : go to the homepage
  }
}
