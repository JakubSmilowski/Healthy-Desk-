import { Injectable } from '@angular/core';
import { UserScore } from '../models/user-score';
@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  userScore: UserScore[] = [{
    id: 1,
    name: 'test',
    score: 19
  },
  {id: 2,
    name: 'test2',
    score: 20
  }];
  
  constructor() { }

  getUserScore(): UserScore[] {
    return this.userScore;
  }


}
