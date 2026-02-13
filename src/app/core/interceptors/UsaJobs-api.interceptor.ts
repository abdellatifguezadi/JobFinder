import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from '../../env'

export const usaJobsApiInterceptor: HttpInterceptorFn = (req, next) => {


  if (req.url.includes('data.usajobs.gov')) {
    const modifiedReq = req.clone({
      setHeaders: {
        'Authorization-Key':  environment.appKey 
      }
    });

    return next(modifiedReq);
  }

  return next(req);
};
