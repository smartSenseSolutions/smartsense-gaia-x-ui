import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AppStorageConstants } from '../../constants/app-storage.constants';
import { UserModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  /**
   * For Loader show/hide functionality
   */
  private loaderCount = 0;
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  /**
   * For showing toasts
   */
  private snackBarMsg: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  /**
   * Logged in user's detail
   */
  private user: UserModel | null = null;

  /**
   * Logged in user's token
   */
  private _token: string = '';

  constructor(public localStorageService: LocalStorageService) {}

  getLoader(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setLoader(val: boolean): void {
    if (val) {
      this.loaderCount += 1;
    } else {
      this.loaderCount -= 1;
      if (this.loaderCount !== 0) {
        val = true;
      }
    }
    this.isLoading.next(val);
  }

  getSnackBar(): Observable<string> {
    return this.snackBarMsg.asObservable();
  }

  setSnackBar(val: string): void {
    this.snackBarMsg.next(val);
  }

  /**
   * To get current Logged in user
   * @returns current User
   */
  getUser(): UserModel {
    if (!this.user) {
      this.user = this.localStorageService.getItem(
        AppStorageConstants.USER
      ) as UserModel;
    }
    return this.user;
  }

  /**
   * To set Current Logged in user
   * @param value User to set
   * @param notify Flag to notify
   */
  setUser(value: UserModel | null): void {
    this.localStorageService.setItem(AppStorageConstants.USER, value);
    this.user = value;
  }

  /**
   * To get logged in user's token
   * @returns logged in user's token
   */
  getToken(): string {
    return this._token;
  }

  /**
   * To set logged in user's token
   * @param value Token to set
   */
  setToken(value: string) {
    this._token = value;
    this.localStorageService.setItem(AppStorageConstants.USER_TOKEN, value);
  }

  clearSession(): void {
    this.localStorageService.clear();
  }
}
