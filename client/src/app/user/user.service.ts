import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, of, Subscription, tap } from 'rxjs';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  public user$ = this.user$$.asObservable();

  USER_KEY = '[user]';
  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;

  get isLogged(): boolean {
  return this.user$$.value !== null;
}

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(username: string, email: string, tel: string, password: string, rePassword: string) {
    return this.http
      .post<UserForAuth>('/api/register', { username, email, tel, password, rePassword })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .post('/api/logout', {})
      .pipe(tap((user) => this.user$$.next(null)));
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));;
  }

initUser() {
  return this.http.get<UserForAuth>('/api/users/profile').pipe(
    tap(user => this.user$$.next(user)),
    catchError(err => {
      if (err.status === 401) {
        this.user$$.next(null);
        return of(null); //no crash
      }

      return of(null);
    })
  );
}

updateProfile(username: string, email: string, imageUrl?: string, description?: string){
  return this.http
    .put<UserForAuth>('/api/users/profile', {
      username,
      email,
      imageUrl,
      description
    })
    .pipe(tap((user) => this.user$$.next(user)));;
}

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
