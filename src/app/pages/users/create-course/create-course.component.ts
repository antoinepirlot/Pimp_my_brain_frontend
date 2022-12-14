import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { Router } from "@angular/router";
import { getToken } from 'src/app/utils/utils';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  notification = ""
  allOptionsCategory!:Category[];
  allOptions:string[] = []
  allLevels:string[] = ["Débutant", "Intermédiaire", "Confirmé"]
  createCourseForm = new FormGroup({
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    optionChosen: new FormControl(this.allOptions[0], Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    levelChosen: new FormControl(this.allLevels[0], Validators.required)
  });

  newCourse: Course = {
    id_category: 1,
    id_teacher: 1, //TODO : add user connected id
    course_description: "",
    price_per_hour: 0,
    city: "",
    country: "",
    level: ""
  };

  constructor(private router: Router, private categoriesService : CategoriesService, private coursesService : CourseService, private userService: UserService){

  }

  ngOnInit(){
    this.getUsersByToken()
    
    this.categoriesService.getAllCategories().subscribe({
      next : (data) => {
        this.allOptionsCategory = data
        this.allOptionsCategory.forEach(c => this.allOptions.push(c.name))
        this.createCourseForm.get("optionChosen")?.setValue(this.allOptions[0])
      }
    });    
  }

  getUsersByToken() {
    this.userService
      .getUserByToken()
      .subscribe({
        next: data => {
          this.newCourse.id_teacher = data.id_user!;
        },
        error: _ => {

        }
      })
  }


  onSubmit() {
    //verify that there is no empty field
    if (this.createCourseForm.value.country?.trim().length == 0 ||
      this.createCourseForm.value.city?.trim().length == 0 ||
      this.createCourseForm.value.optionChosen?.trim().length == 0 ||
      this.createCourseForm.value.description?.trim().length == 0 ||
      this.createCourseForm.value.price?.length===0
    ) {
      this.notification = "Vous devez remplir tous les champs du formulaire";
      return;
    }
    if(Number.isNaN(Number(this.createCourseForm.value.price))) {
      this.notification = "Vous devez entrer un nombre dans le champ prix";
      return;
    }
    if(parseFloat(this.createCourseForm.value.price!) <= 0 ){
      this.notification = "Vous devez entrer un nombre positif dans le champ prix";
      return;
    }
    let tabCategory = this.allOptionsCategory.filter(c => c.name === this.createCourseForm.value.optionChosen);
    if(tabCategory.length === 0){
      this.notification = "La catégorie entrée n'existe pas";
      return;
    }
    this.newCourse.country = this.createCourseForm.value.country!;
    this.newCourse.city = this.createCourseForm.value.city!;
    this.newCourse.id_category = tabCategory[0].id_category;
    this.newCourse.course_description = this.createCourseForm.value.description!;
    this.newCourse.price_per_hour = parseFloat(this.createCourseForm.value.price!);
    this.newCourse.level = this.createCourseForm.value.levelChosen!;
    console.log(this.newCourse)
    
    // add the course
    this.coursesService.createOneCourse(this.newCourse).subscribe({
      next: () => {
        // go to the homepage
        this.router.navigateByUrl("/");
      },
      error: (error) => {
        if (error.status === 400) {
          this.notification = "Certains champs sont incorrectes";
        } else if (error.status === 401){
          // go to the login page
          this.router.navigateByUrl("/login").then(() => {
            window.location.reload();
          });
        }else {
          console.warn("Server error");
        }
      }
    });
    
  }
}
