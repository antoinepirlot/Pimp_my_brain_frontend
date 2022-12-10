import {environement} from "../.../../../environement/environement"

async function getAllTeacherCourses() {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }
  const idTeacher = 1 //TODO use the right id
  const response = await fetch(`${environement.ROOT_URL}/courses/teacher/${idTeacher}`, request);
  if (!response.ok) {
    throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
    );
  }
  return response.json();
}

export default {
  getAllTeacherCourses,
}