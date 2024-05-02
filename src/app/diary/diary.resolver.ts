import { ResolveFn } from '@angular/router';
import { ExerciseSet, ExerciseSetListApi } from './interfaces/exercise-set';
import { inject } from '@angular/core';
import { ExerciseSetsService } from './services/exercise-sets.service';

export const diaryResolver: ResolveFn<ExerciseSetListApi> = (route, state) => {
  const exerciseSetsService = inject(ExerciseSetsService)
  return exerciseSetsService.getInitialList()
};

export const entryResolver: ResolveFn<ExerciseSet> = (route, state) => {
  const entryId = route.paramMap.get('id')!
  const exerciseSetsService = inject(ExerciseSetsService)
  return exerciseSetsService.getItem(entryId)
}
