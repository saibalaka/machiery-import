import { Component,OnInit,inject } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
  userServiceObj = inject(UserService)

  //ng on it it lifecycle method
  ngOnInit(): void {
    setInterval(()=>this.userServiceObj.setLoginStatus(),1000)
  }

}
