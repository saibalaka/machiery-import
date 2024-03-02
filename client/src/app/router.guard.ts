import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'
import { UserService } from './services/user.service';

export const routerGuard: CanActivateFn = (route, state) => {
  const userServiceObj = inject(UserService)
  const routerObj = inject(Router)

  if(userServiceObj.userLoginStatus()){
    return true;
  }else{
    return routerObj.navigate(['login'])
  }
};
