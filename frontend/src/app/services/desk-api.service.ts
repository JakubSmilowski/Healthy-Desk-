import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Desk } from '../models/DeskModel';

@Injectable({
  providedIn: 'root'
})
export class DeskApiService {

  private conectedDeskId: string = '';

  private apiUrl = 'http://localhost:8000/api/v1/E9Y2LxT4g1hQZ7aD8nR3mWx5P0qK6pV7/desks'

 //  private apiUrl = 'http://localhost:3000/api/desks'


  constructor(private http: HttpClient) {}

  getDesks(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl)
  }

  getDeskInfo(deskId: string): Observable<Desk> {
    const deskUrl = `${this.apiUrl}/${deskId}`;
    return this.http.get<Desk>(deskUrl);
  }

  updateDeskPosition(position: number): Observable<any> {
    const conectedDeskUrl = `http://127.0.0.1:8000/api/v1/E9Y2LxT4g1hQZ7aD8nR3mWx5P0qK6pV7/desks/cd:fb:1a:53:fb:e6`;
    // if(this.conectedDeskId === '') {
    //   alert("No desk connected");
    // }
    this.getConectedDeskId();
    // const conectedDeskUrl = `${this.apiUrl}/${this.conectedDeskId}`;
    const body = { position: position * 10 };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.http.put<any>(conectedDeskUrl, body, { headers });
  }
  
  
  updateDeskID(deskId: string) {
  
  }

  getConectedDeskId() {
    console.log(this.conectedDeskId);
    return this.conectedDeskId;
  }

  connectToDesk(id: string) {
    this.conectedDeskId = id;
    alert("connected to desk with id: " + this.conectedDeskId);
    // this.saveToLocalStorage(this.conectedDeskId);
  }

  // saveToLocalStorage(id: string){
  //   localStorage.setItem('deskId', id);
  // }

  // loadfROmLocalStorage(){
  //   return localStorage.getItem('deskId');
  // }
}



