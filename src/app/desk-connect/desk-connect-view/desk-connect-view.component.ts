import { Component } from '@angular/core';
import { Desk, DeskApiService } from '../../services/desk-api.service';

@Component({
  selector: 'app-desk-connect-view',
  templateUrl: './desk-connect-view.component.html',
  styleUrl: './desk-connect-view.component.css'
})
export class DeskConnectViewComponent {
  desks: string[] = [];

  constructor(private deskApiService: DeskApiService) {}
  
  loadDesks() {
    this.deskApiService.getDesks().subscribe( data => {
        this.desks = data;
    });
  }

  deskInfo: Desk | null=null;

  loadDeskDetails(id: string) {
    this.deskApiService.getDeskInfo(id).subscribe ( data => {
      this.deskInfo = data;
    })
  }
}
