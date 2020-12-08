import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Credentials} from '../../models/Credentials';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public readonly userForm: FormGroup;
  public isLogin: boolean;
  public error?: string;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(255)
      ]),
      passwd: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(255)
      ])
    });

    this.isLogin = true;
  }

  public onSubmit() {
    const credentials = new Credentials(
      this.userForm.get('username').value,
      this.userForm.get('passwd').value
    );

    if (this.isLogin) {
      this.authenticationService.login(credentials)
        .subscribe(
          () => {
            const redirectTo = this.route.snapshot.queryParams.redirect || '/';
            this.router.navigate([redirectTo]);
          },
          error => {
            if (error.status === 401) {
              this.error = $localize`Usuario y contraseña no válidos.`;
            } else {
              this.error = error.message;
            }
          }
        );
    } else {
      this.authenticationService.register(credentials)
        .subscribe(
          () => {
            this.router.navigate(['/']);
          },
          () => {
            this.error = $localize`No se ha podido completar el registro.`;
          }
        );
    }
  }

  public onChange() {
    this.isLogin = !this.isLogin;
    this.error = null;
  }
}
