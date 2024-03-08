import { HttpInterceptorFn } from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  
  //get token from the local storage
  const token = localStorage.getItem('token')

  if(!token){
    return next(req)
  }else{
    //add authorization to headers of request
    const reqWithToken = req.clone({
      headers:req.headers.set('Authorization',`Bearer ${token}`)
    })
    return next(reqWithToken);
  }

};
