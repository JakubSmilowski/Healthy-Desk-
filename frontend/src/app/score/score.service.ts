import { Injectable } from '@angular/core';
import { UserScore } from '../models/user-score';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  userScore: UserScore[] = [{
    username: 'user1',
    score: 19
  },
  {
    username: 'user2',
    score: 20
  },
  {
    username: 'Tomasz',
    score: 21
  },
  {   
    username: 'testUser',
    score: 22
  },
  {   
    username: 'Robert',
    score: 23
  },
  ];
  
  getUserScore(): UserScore[] {
    return this.userScore;
  }
}
