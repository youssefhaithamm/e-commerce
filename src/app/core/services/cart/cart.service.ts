import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Icart } from '../../../shared/interfaces/icart';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly id = inject(PLATFORM_ID);

 cartNumber:WritableSignal<number> = signal(0);


  //  myToken: any =localStorage.getItem('userToken');
  private myToken: string = '';
  constructor(private httpClient: HttpClient) {
    
    if (isPlatformBrowser(this.id)) {
      const token = localStorage.getItem('userToken');
      this.myToken = token ? token : ''; // تجنب تمرير null أو undefined
    }

   }





  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      }, 
      // {
      //   headers:{
      //     token: this.myToken
  
      //   }
      // }
    )
  }

  getLogedUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`,
      // {
      //   headers:{
      //     token: this.myToken
  
      //   }
      // }
    )

  }

  removeSpecifiCart(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
      // {
      //   headers:{
      //     token: this.myToken
  
      //   }
      // }
    )
  }

  updateProductQuantity(id: string, nuwCount: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {

        "count": nuwCount

      },
      // {
      //   headers:{
      //     token: this.myToken
  
      //   }
      // }
    )
     
  }

   clearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`,
      // {
      //   headers:{
      //     token: this.myToken
  
      //   }
      // }
    )
  }

}
