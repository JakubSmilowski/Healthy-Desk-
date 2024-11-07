import { Component } from '@angular/core';
import { ScoreModule } from '../score.module';
import { UserScore } from '../../models/user-score';
import { ScoreService } from '../score.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-score-view',
  templateUrl: './score-view.component.html',
  styleUrl: './score-view.component.css'
})
export class ScoreViewComponent implements OnInit {

  constructor(private scoreService: ScoreService) { }

  users: UserScore[] = [];
  currentUserId: number = 1;
  currentUserName: string = '';
  todayScore: number = 21;  
  weekScore: number = 41;
  monthScore: number = 256;

  ngOnInit(): void {
    this.users = this.scoreService.getUserScore();
    this.displayUserScoreInOrder();
    //This should be implemented beetter depnnding on the loged in user.
    this.currentUserId = this.users[0].id; 

    this.currentUserName = this.users[this.currentUserId].name;
    // this.currentUserScore = this.users[this.currentUserId].score;
  }

  displayUserScoreInOrder() {
    this.users = this.users.sort((a, b) => b.score - a.score);
  }
}