import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-deatils',
  template: `
    <p>
      appointment-deatils works!
    </p>
  `,
  styles: [
  ]
})
export class AppointmentDeatilsComponent implements OnInit {
  constructor() {
    
  }
  ngOnInit(): void {
    let id = localStorage.getItem('id_course')
    console.log("localStorage",id);
    
  }

  

}
