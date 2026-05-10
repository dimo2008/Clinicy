import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewStudent } from './view-student/view-student';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ViewStudent],
  imports: [CommonModule, FormsModule],
  exports: [ViewStudent]
})
export class StudentModule {}
