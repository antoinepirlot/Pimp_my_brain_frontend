import {Course} from "../models/course";

export function isConnected() {
  return localStorage.getItem("token") !== null || sessionStorage.getItem("token") !== null;
}

export function getToken() {
  let token: any = localStorage.getItem("token");
  if (token) {
    return JSON.parse(token)
  }
  token = sessionStorage.getItem("token");
  if (token) {
    return JSON.parse(token);
  }
}

export function getIdUserConnected() {
  return JSON.parse(atob(getToken().split(".")[1])).id
}

export function createTableOfCourses(data: Array<Course>): Array<Array<Course>> {
  let courses: Array<Array<Course>> = Array<Array<Course>>();
  if(data.length===0) return courses;
  let numberOfColumns = 4;
  //Separate the courses in lists of 3 courses
  for(let i = 0; i< data.length ; i=i+numberOfColumns){
    let dataSeparatedInBloc:Course[]  = new Array<Course>();
    let end = i+numberOfColumns;
    for(let j = i; j< data.length && j<end ; j++){
      if(data[j].course_description.length>113){
        data[j].course_description=data[j].course_description.substring(0,113) + "...";
      }
      dataSeparatedInBloc.push(data[j]);
    }
    courses.push(dataSeparatedInBloc);
  }
  return courses;
}