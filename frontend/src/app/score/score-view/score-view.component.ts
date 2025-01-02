import { Component } from '@angular/core';
import { ScoreModule } from '../score.module';
import { UserScore } from '../../models/user-score';
import { ScoreService } from '../score.service';
import { OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { User } from '../../models/UserModel';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-score-view',
  templateUrl: './score-view.component.html',
  styleUrl: './score-view.component.css'
})
export class ScoreViewComponent implements OnInit {

  constructor(private scoreService: ScoreService, private loginService: LoginService,private http: HttpClient) {
  }

  users: UserScore[] = [];
  currentUserId: number = 1;
  currentUserName: string = '';
  todayScore: number = 21;  
  weekScore: number = 41;
  monthScore: number = 256;


  ngOnInit(): void {
    this.loadCurrentUsuerScore();
    // this.users = this.scoreService.getUserScore();
    this.getDataFromApi();
    this.loadDataFromApi();
    this.displayUserScoreInOrder();
  }

  loadCurrentUsuerScore(){
    this.currentUserName = this.loginService.getCurrentUsername();
    this.weekScore = this.loginService.getUserScore() - 21; ;
    this.monthScore = this.loginService.getUserScore();
    this.todayScore = this.loginService.getUserScore() -166;

    
  }

  getDataFromApi(){
    return this.http.get('http://localhost:3000/api/users/score');
  }

  loadDataFromApi(){
    this.getDataFromApi().subscribe((data: any) => {
      console.log(data)
      console.log(data.usersScore);
      this.users = [];
      data.usersScore.forEach((userScore: UserScore) => {
        this.users.push(userScore);
      });
    });
  }

  displayUserScoreInOrder() {
    this.users = this.users.sort((a, b) => b.score - a.score);
  }
}