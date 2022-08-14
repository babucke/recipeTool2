import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user: any

  constructor(public authService: AuthService) { 
    this.user = authService.userData;  
  }

  ngOnInit(): void {
  }

}
