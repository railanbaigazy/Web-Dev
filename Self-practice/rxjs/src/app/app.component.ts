import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>{{ title }}</h1>
    <router-outlet />
  `,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Loadinggg...';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => console.log(data));
  } 
}
