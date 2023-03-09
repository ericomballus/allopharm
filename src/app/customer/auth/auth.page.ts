import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modeles/user-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private notifi: NotificationService
  ) {}
  ngOnInit() {}
  signUp(email: any, password: any) {
    // let email = `${pseudo.value}@test.com`;
    this.notifi.presentLoading(15000);
    this.authService
      // .SignIn(email.value, password.value)
      .SignIn(email.value, password.value)
      .then((res: any) => {
        console.log(res);
        this.authService
          .getUser(res.user.uid)
          .then((user: User) => {
            console.log(user);
            this.notifi.dismissLoading().then().catch();
            this.router.navigateByUrl('home');
            //
          })
          .catch((err) => this.notifi.dismissLoading());
      })
      .catch((error) => {
        this.notifi.dismissLoading().then().catch();
        this.notifi.presentToast(
          'erreur authentification rassurer vous que vous avez entrez les identifiants corrects',
          'danger',
          6000
        );
      });
  }
}
