import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  notification = ""
  allOptionsCategory!:Category[];
  allOptions:string[] = []
  createCourseForm = new FormGroup({
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    optionChosen: new FormControl(this.allOptions[0], Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  newCourse: Course = {
    id_category: 1,
    id_teacher: 1, //TODO : add user connected id
    course_description: "",
    price_per_hour: 0,
    city: "",
    country: "",
    id_level: 1 
  };

  constructor(private router: Router, private categoriesService : CategoriesService, private coursesService : CourseService){

  }


  ngOnInit(){
    this.categoriesService.getAllCategories().subscribe({
      next : (data) => {
        this.allOptionsCategory = data
        this.allOptionsCategory.forEach(c => this.allOptions.push(c.name))
        this.createCourseForm.get("optionChosen")?.setValue(this.allOptions[0])
      }
    });    
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
    this.newCourse.country = this.createCourseForm.value.country!;
    this.newCourse.city = this.createCourseForm.value.city!;
    this.newCourse.id_category = 1; //TODO : find the good category
    this.newCourse.course_description = this.createCourseForm.value.description!;
    this.newCourse.price_per_hour = parseInt(this.createCourseForm.value.price!);
    this.newCourse.id_level = 1;//TODO : add level in form
    console.log(this.newCourse)

    // add the course
    this.coursesService.createOneCourse(this.newCourse).subscribe();
    
    // go to the homepage
    this.router.navigateByUrl("/").then(() => {
      window.location.reload();
    });
  }
}
