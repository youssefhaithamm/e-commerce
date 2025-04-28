import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly platformId = inject(PLATFORM_ID);
  private myToken: string = '';

  constructor(private httpClient :HttpClient) {
      if (isPlatformBrowser(this.platformId)) {
              const token = localStorage.getItem('userToken');
              this.myToken = token ? token : ''; // تجنب تمرير null أو undefined
            }
   }



  addProductToWishList(id:string ):Observable<any>{

    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
    }
    // ,{
    //   headers:{
    //     token:this.myToken
    //   }
      
    // }
  );
  }
  removeProductFromWishList(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,
      // {
      //   headers:{
      //     token:this.myToken
      //   }
        
      // }
    )
  }


  getLoggedWishList():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`,
      // {
      //   headers:{
      //     token:this.myToken
      //   }
        
      // }
    )
  }













}
