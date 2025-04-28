import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const id = inject(PLATFORM_ID)
  
   if(isPlatformBrowser(id)){
    if(localStorage.getItem('userToken')!==null){
      _router.navigate(['/home'])
      return false;
    }
    else{
      return true;
    }
   }
   else{
    return false;
   }
};
