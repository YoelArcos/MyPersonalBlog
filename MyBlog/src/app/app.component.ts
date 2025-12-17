import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  ngOnInit() {
      throw new Error('Method not implemented.');
  }
  forecasts(forecasts: any) {
      throw new Error('Method not implemented.');
  }
  title = 'MyBlog';
}
