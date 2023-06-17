import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { userInfo } from 'src/shared_modules/shared/classes/user-info';
import { AuthService } from 'src/shared_modules/shared_services/authentication_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error: any = '';
  response: any = {};
  user: userInfo = new userInfo('', '', '', '', '');
  constructor(
    private authService: AuthService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Register');
  }
  saveData() {
    this.authService.addUser(this.user).subscribe(
      (data) => {
        this.response = data;

        if (this.response.message == 'success') {
          this.router.navigate(['/authentication/login']);
        } else {
          this.error = this.response.message;
        }
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
