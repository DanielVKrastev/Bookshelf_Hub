import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appInterceptor } from './app-interceptor';
import { UserService } from './user/user.service';
import { firstValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([appInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled'
    })),
    provideAppInitializer(() => {
  const userService = inject(UserService);
  return firstValueFrom(userService.initUser());
})

  ]
};
