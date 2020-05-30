import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Auth, Hub } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private zone: NgZone,
    private spinner: NgxSpinnerService) {

    // Used for listening to login events
    Hub.listen("auth", ({ payload: { event, data } }) => {
      if (event === "cognitoHostedUI" || event === "signedIn") {
        console.log(event);
        this.zone.run(() => this.router.navigate(['/dashboard']));
      } else {
        this.spinner.hide();
      }
    });

    //currentAuthenticatedUser: when logged in user comes to login page again
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.spinner.hide();
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }).catch((err) => {
        this.spinner.hide();
        console.log(err);
      })

  }

  ngOnInit() { }

  onLoginClick() {
    this.spinner.show();
    Auth.federatedSignIn();
  }

}
