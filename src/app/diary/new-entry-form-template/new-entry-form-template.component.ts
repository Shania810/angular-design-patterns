import { Component, inject, OnInit } from '@angular/core';
import { NewItemButtonComponent } from '../new-item-button/new-item-button.component';
import { FormsModule } from '@angular/forms';
import { ExerciseSetsService } from '../services/exercise-sets.service';
import { Router } from '@angular/router';
import { ExerciseSet } from '../interfaces/exercise-set';
import { JsonPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-new-entry-form-template',
  standalone: true,
  imports: [NewItemButtonComponent, FormsModule,JsonPipe],
  templateUrl: './new-entry-form-template.component.html',
  styleUrl: './new-entry-form-template.component.css',
  providers:[ExerciseSetsService]
})
export class NewEntryFormTemplateComponent implements OnInit {
  private exerciseSetsService = inject(ExerciseSetsService);
  private titleService = inject(Title)
  private router = inject(Router);

  entry: ExerciseSet = { date: new Date(), exercise: '', reps: 0, sets: 0 };

  ngOnInit(): void {
      this.titleService.setTitle('Template Form')
  }

  newEntry() {
    const newEntry = { ...this.entry };
    this.exerciseSetsService
      .addNewItem(newEntry)
      .subscribe((entry) => this.router.navigate(['/home']));
  }
}
