import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'view-student',
  standalone: false,
  templateUrl: './view-student.html',
  styleUrl: './view-student.css',
})
export class ViewStudent implements OnInit, OnChanges {
  name: string = 'John Doe';
  age: number = 20;
  email: string = 'johndoe@gmail.com';

  ngOnInit(): void {
    // Simulate fetching student data from an API
      this.name = 'Jane Smith';
      this.age = 22;
      this.email = 'janesmith@gmail.com';
  }
  ngOnChanges(changes: any): void {
    this.email="hamaadda"
    console.log(`Name changed from ${changes['name'].previousValue} to ${changes['name'].currentValue}`);

    // Handle any changes to input properties if needed
  
}

}

