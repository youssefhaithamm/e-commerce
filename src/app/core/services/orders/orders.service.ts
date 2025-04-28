import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

    private readonly platformId = inject(PLATFORM_ID);
    private myToken: string = '';
  constructor(private httpClient:HttpClient) { 
     if (isPlatformBrowser(this.platformId)) {
          const token = localStorage.getItem('userToken');
          this.myToken = token ? token : ''; // تجنب تمرير null أو undefined
        }
  }


  checkOutPayMent(id:string,data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress":data
    },
    // {
    //   headers:{
    //     token: this.myToken

    //   }
    // }
    )
  }

  greateCashOrder(id:string,data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,{
      "shippingAddress":data
  },
  // {
  //   headers:{
  //     token: this.myToken

  //   }
  // }

    )
  }


  getallOrder():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/`)
  }




  getUserOrder(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`);
  }



}
