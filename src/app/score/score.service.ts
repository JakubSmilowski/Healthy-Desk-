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
  },
  {id: 3,
    name: 'test3',
    score: 21
  },
  {id: 4,   
    name: 'test4',
    score: 22
  },
  {id: 5,   
    name: 'test5',
    score: 23
  },
  {id: 6,   
    name: 'test6',
    score: 24
  },
  {id: 7,   
    name: 'test7',
    score: 25
  },
  {id: 8,   
    name: 'test8',
    score: 26
  },
  {id: 9,   
    name: 'test9',
    score: 27
  },
  {id: 10,   
    name: 'test10',
    score: 28
  },];
  
  constructor() { }

  getUserScore(): UserScore[] {
    return this.userScore;
  }


}
