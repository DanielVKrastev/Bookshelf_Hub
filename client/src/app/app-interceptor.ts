import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

const { apiUrl } = environment;
const API = '/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true, //add JWT in cookies
    });
  }

  const router = inject(Router);
  const url = router.url;

  const isPublic =
    url === '/' ||
    url === '/home' ||
    url === '/books-catalog' ||
    url === '/register' ||
    url.startsWith('/books-catalog/');

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        if (err.status === 0) {
          console.error('Network error:', err);
          router.navigate(['/home']);
        }

        if (!isPublic && !req.url.includes('/login')) {
          router.navigate(['/login']);
        }

      } else if(err.status === 409) {
        
         if (!isPublic && !req.url.includes('/register')) {
          router.navigate(['/register']);
        }

      } else {
        console.log('ERROR', err);
        router.navigate(['/404']);
      }

      return throwError(() => err);
    })
  );
};
