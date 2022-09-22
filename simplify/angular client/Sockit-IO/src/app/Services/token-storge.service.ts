import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USERID_KEY = 'auth-userID';
const IsLogged_KEY = 'auth-loggIn';

@Injectable({
  providedIn: 'root',
})
export class TokenStorgeService {
  constructor() {}

  //clear sessionStorage
  signOut() {
    window.sessionStorage.clear();
  }

  // save and get token
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  // save and get userName
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserName(): string | null {
    return window.sessionStorage.getItem(USER_KEY);
  }

  // save UserID
  public saveUserID(userID: any): void {
    window.sessionStorage.removeItem(USERID_KEY);
    window.sessionStorage.setItem(USERID_KEY, JSON.stringify(userID));
  }

  public getUserId(): any {
    return window.sessionStorage.getItem(USERID_KEY);
  }

  //get and save IsLoggedIn
  public setIsLoggedIn(state: string): void {
    window.sessionStorage.removeItem(IsLogged_KEY);
    window.sessionStorage.setItem(IsLogged_KEY, state);
  }

  public getIsLoggedIn(): string | null {
    return window.sessionStorage.getItem(IsLogged_KEY);
  }
}
