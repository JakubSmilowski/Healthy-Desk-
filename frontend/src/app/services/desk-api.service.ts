import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Desk {
  id: string;
  name: string;
  manufacturer: string;
  position: number;
  speed: number;
  status: string;
}


@Injectable({
  providedIn: 'root'
})
export class DeskApiService {
  private apiUrl = 'http://localhost:8000/api/v1/E9Y2LxT4g1hQZ7aD8nR3mWx5P0qK6pV7/desks'

  constructor(private http: HttpClient) { }

  getDesks(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl)
  }

  getDeskInfo(deskId: string): Observable<Desk> {
    const deskUrl = `${this.apiUrl}/${deskId}`;
    return this.http.get<Desk>(deskUrl);
  }
}
