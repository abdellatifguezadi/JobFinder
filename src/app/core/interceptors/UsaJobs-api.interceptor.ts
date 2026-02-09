import { HttpInterceptorFn } from '@angular/common/http';

export const usaJobsApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('data.usajobs.gov')) {
    const modifiedReq = req.clone({
      setHeaders: {
        'Authorization-Key': 'ERis86ByuA6CPHbnuE6maGVDX4pttAJbfJH7AaEfi3E='
      }
    });

    return next(modifiedReq);
  }

  return next(req);
};
