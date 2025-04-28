
import { Icart } from './../../shared/interfaces/icart';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink,SweetAlert2Module],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit ,OnDestroy {
  cartDetails:Icart={} as Icart ;
  private readonly cartService = inject(CartService);
   subCart:Subscription=new Subscription();


  ngOnInit(): void {
    this.getCartData();
    
  }
 getCartData():void{
 this.subCart= this.cartService.getLogedUserCart().subscribe({
    next:(res)=>{
     
      this.cartDetails=res.data;
    }
  })
 }
 removeItem(id:string):void{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
    this.subCart=  this.cartService.removeSpecifiCart(id).subscribe({
        next:(res)=>{
         
          this.cartDetails= res.data;
          this.cartService.cartNumber.set(res.numOfCartItems);


        }
      }
    )
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });

  

 }

 updateCount(id:string , count:number):void{
  this.cartService.updateProductQuantity(id,count).subscribe({
    next:(res)=>{
    
      this.cartDetails=res.data;
    }
  })
  

 }

 claerCart():void{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
    this.subCart=  this.cartService.clearCart().subscribe({
        next:(res)=>{
          if(res.message=="success"){
            this.cartDetails={} as Icart;
            this.cartService.cartNumber.set(0);
          }
        }
      })

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });

 }

ngOnDestroy(): void {
  this.subCart.unsubscribe();
}





}
