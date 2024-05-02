import { inject, Injectable } from '@angular/core';
import {
  ExerciseSet,
  ExerciseSetList,
  ExerciseSetListApi,
} from '../interfaces/exercise-set';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../login/auth.service';

@Injectable({
  providedIn: 'root'
})
//@Injectable()
export class ExerciseSetsService {
  private setList?: ExerciseSetList;
  private httpClient = inject(HttpClient);
  //private url = 'http://localhost:3000/diary';
  private url = 'diary'
  private authService = inject(AuthService)

  getInitialList(): Observable<ExerciseSetListApi> {
    /*this.setList = [
      { id: '1', date: new Date(), exercise: 'Deadlift', reps: 15, sets: 3 },
      { id: '2', date: new Date(), exercise: 'Squat', reps: 15, sets: 3 },
      { id: '3', date: new Date(), exercise: 'Barbell row', reps: 15, sets: 3 },
    ];
    return this.setList;*/
    /*const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.token}`
    })*/
    const headers = new HttpHeaders().set('X-TELEMETRY','true')
    return this.httpClient.get<ExerciseSetListApi>(this.url, {headers});
  }

  refreshList(): Observable<ExerciseSetListApi> {
    /*this.setList = [
      { id: '1', date: new Date(), exercise: 'Deadlift', reps: 15, sets: 3 },
      { id: '2', date: new Date(), exercise: 'Squat', reps: 15, sets: 3 },
      { id: '3', date: new Date(), exercise: 'Barbell row', reps: 15, sets: 3 },
      { id: '4', date: new Date(), exercise: 'Leg Press', reps: 15, sets: 3 },
    ];
    return this.setList;*/
    return this.httpClient.get<ExerciseSetListApi>(this.url);
  }

  addNewItem(item: Partial<ExerciseSet>): Observable<ExerciseSet> {
    /*if(this.setList){
      this.setList = [...this.setList, item]
    }else{
      this.setList = [item]
    }
    return this.setList
  }*/
    return this.httpClient.post<ExerciseSet>(this.url, item);
  }

  updateItem(id: string, item: Partial<ExerciseSet>) {
    return this.httpClient.put<ExerciseSet>(`${this.url}/${id}`, item);
  }

  getItem(id: string): Observable<ExerciseSet>{
    return this.httpClient.get<ExerciseSet>(`${this.url}/${id}`)
  }

  deleteItem(id: string) {
    return this.httpClient.delete<boolean>(`${this.url}/${id}`);
  }
}
