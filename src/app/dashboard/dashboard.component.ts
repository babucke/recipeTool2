import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from '../shared/services/authentication/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public authService: AuthService) { }
  ngOnInit(): void { }
}