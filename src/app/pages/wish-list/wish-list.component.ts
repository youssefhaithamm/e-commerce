import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishList/wishlist.service';
import { Subscription } from 'rxjs';
import { Iwish } from '../../shared/interfaces/iwish';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  subWish:Subscription = new Subscription();
  subCart:Subscription = new Subscription();
  wishData: Iwish[]= [] ;

  ngOnInit(): void {
    this.getlogged();
    
  }

  getlogged():void{
     this.wishlistService.getLoggedWishList().subscribe({
      next:(res)=>{
    
        this.wishData=res.data
      }
     })
  }

  addToCart(id: string): void {
    this.subCart= this.cartService.addProductToCart(id).subscribe({
       next: (res) => {
       
         if (res.status === "success") {
           this.toastrService.success(res.message, 'Fresh Cart')
           this.cartService.cartNumber.set(res.numOfCartItems);
           this.removeItem(id);
         }
 
       }
     })
     
 
 
   }
 
    removeItem(id:string):void{
      this.subWish=  this.wishlistService.removeProductFromWishList(id).subscribe({
        next:(res)=>{
          this.wishData = this.wishData.filter(product => product.id !== id);
        
        }
      }
    )
    }
}
