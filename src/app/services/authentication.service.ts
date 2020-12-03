import {Injectable} from '@angular/core';
import {Credentials} from '../models/Credentials';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {CredentialsWrapper} from './wrappers/CredentialsWrapper';
import {map, tap} from 'rxjs/operators';

const CREDENTIALS_ITEM = 'credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public hasCredentials(): boolean {
    return localStorage.getItem(CREDENTIALS_ITEM) !== null;
  }

  public getCredentials(): Credentials | undefined {
    const item = localStorage.getItem(CREDENTIALS_ITEM);

    if (item) {
      const stored = JSON.parse(item);
      return new Credentials(stored.username, stored.passwd);
    } else {
      return undefined;
    }
  }

  public register(credentials: Credentials): Observable<Credentials> {
    if (this.hasCredentials()) {
      throw new Error('El usuario ya está registrado.');
    } else {
      const userData = {
        username: credentials.username,
        passwd: credentials.passwd
      };

      return this.http.post<Credentials>(`${environment.publicApi}/users.json`, userData)
        .pipe(
          tap(() => localStorage.setItem(CREDENTIALS_ITEM, JSON.stringify(credentials)))
        );
    }
  }

  public login(credentials: Credentials): Observable<Credentials> {
    if (this.hasCredentials()) {
      return of(this.getCredentials());
    } else {
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + credentials.asToken(),
        Accept: 'application/json'
      });

      return this.http.get<CredentialsWrapper>(`${environment.privateApi}/users/${credentials.username}`, {headers})
        .pipe(
          map(() => {
            localStorage.setItem(CREDENTIALS_ITEM, JSON.stringify(credentials));
            return credentials;
          })
        );
    }
  }

  public logout() {
    localStorage.removeItem(CREDENTIALS_ITEM);
  }
}
