import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CartItem, Iorders } from '../../shared/interfaces/iorders';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-oreder',
  imports: [],
  templateUrl: './all-order.component.html',
  styleUrl: './all-order.component.scss'
})
export class AllOrderComponent implements OnInit , OnDestroy {
  private readonly allOrder = inject(OrdersService);
  orderData:Iorders[] = []
  // cartItems:CartItem[]=[]
  supOrder:Subscription= new Subscription();
  userId:any;

  ngOnInit(): void {
    this.getAllOrder();



  }

  getAllOrder():void{
   this.supOrder= this.allOrder.getUserOrder('67a26f18518151d803bd7944').subscribe({
      next:(res)=>{
        
        this.orderData= res ;
        
      
        
      }
    })
  }

  ngOnDestroy(): void {
    this.supOrder.unsubscribe();
  }
  
}
