import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  notification = ""
  allOptionsCategory!:Category[];//["PHP", "Python", "SQL"] // TODO : ask categories to the backend
  allOptions:string[] = []
  createCourseForm = new FormGroup({
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    optionChosen: new FormControl(this.allOptions[0], Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private categoriesService :CategoriesService){

  }

  ngOnInit(){
    this.categoriesService.getAllCategories().subscribe({
      next : (data) => {
        this.allOptionsCategory = data
        this.allOptionsCategory.forEach(c => this.allOptions.push(c.name))
      },
      error : (error) => {
        if(error.status === 404){
          this.notification = "L'email ou le mot de passe est incorrect";
        }
        else{
          console.warn("Server error");
        }
      }
    });
      //cat => this.allOptionsCategory = cat);
 
    
  }


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
