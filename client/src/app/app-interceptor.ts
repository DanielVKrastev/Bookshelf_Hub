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

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        const url = router.url;

        const isPublic =
          url === '/' ||
          url === '/home' ||
          url === '/books-catalog' ||
          url === '/register' ||
          url.startsWith('/books-catalog/');

        if (!isPublic) {
          router.navigate(['/login']);
        }

      } else {
        console.log('ERROR', err);
        router.navigate(['/404']);
      }

      return throwError(() => err);
    })
  );
};
