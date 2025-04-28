import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);
  private readonly cartService =inject(CartService);
  cartId:string='';
  isloading:boolean=false;
  checkOutForm!:FormGroup;
  isSuccess:string='';
   subOrder:Subscription=new Subscription();
  

 ngOnInit(): void {
  this.initForm();
  this.getCartId();
 }
initForm():void{
  this.checkOutForm= new FormGroup({
    details: new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city:new FormControl(null,[Validators.required])

   })
}

getCartId():void{
 this.subOrder= this.activatedRoute.paramMap.subscribe({
    next:(param)=>{
     
     this.cartId = param.get('id')!
    }
  })
}


 submitForm():void{
  console.log(this.checkOutForm.value);
 this.subOrder= this.ordersService.checkOutPayMent(this.cartId,this.checkOutForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.status=='success'){
        open(res.session.url,'_self');
      }
    },
    error:(err)=>{
      console.log(err)

    }
  })
 }



 cashPayMent():void{
 this.subOrder= this.ordersService.greateCashOrder(this.cartId,this.checkOutForm.value).subscribe({
    next:(res)=>{
      if(res.status=='success'){
        this.isSuccess=res.status;
        this.cartService.cartNumber.set(0);
        
      }

    },
    error:(err)=>{
      console.log("errCash",err);
    }
  })

 }

}
