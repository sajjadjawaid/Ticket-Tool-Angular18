import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../Services/master.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    emailId: '',
    password: '',
  };

  Masterservice = inject(MasterService);
  router = inject(Router);
  onLogin() {
    this.Masterservice.login(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        localStorage.setItem('ticketUser', JSON.stringify(res.data));
        this.router.navigateByUrl('dashboard');
      } else {
        alert(res.message);
      }
    });
  }
}
