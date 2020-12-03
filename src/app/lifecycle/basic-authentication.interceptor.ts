import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class BasicAuthenticationInterceptor implements HttpInterceptor {

  constructor(private readonly authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authenticationService.hasCredentials()) {
      const user = this.authenticationService.getCredentials();

      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${user.asToken()}`
        }
      });
    }

    return next.handle(request);
  }
}
