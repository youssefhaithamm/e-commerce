
import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishList/wishlist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [SearchPipe,RouterLink,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit ,OnDestroy {
  text:string='';
    subBroduct:Subscription=new Subscription();
    subCart:Subscription=new Subscription();
    subWishList: Subscription = new Subscription();
    private id = inject(PLATFORM_ID);
  
private readonly wishlistService = inject(WishlistService);
  private readonly productsService = inject(ProductsService);
  private readonly toastrService = inject(ToastrService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
   private readonly CartService= inject(CartService);
  products: WritableSignal<Iproduct[]> = signal([]);
  wishList: Set<string> = new Set(); 



  ngOnInit(): void {
    this.getProductsData();
  }
  getProductsData(): void {
    this.ngxSpinnerService.show()
  this.subBroduct=  this.productsService.getAllProduct().subscribe({
      next: (res) => {
      
        this.products.set(res.data)
        this.ngxSpinnerService.hide()
      },
    

    })
  }

  addToCart(id: string): void {
   this.subCart= this.CartService.addProductToCart(id).subscribe({
      next: (res) => {
       
        if (res.status === "success") {
          this.toastrService.success(res.message, 'Fresh Cart')
          this.CartService.cartNumber.set(res.numOfCartItems);
        
        }

      }
    })
    


  }








  addToWish(id: string): void {
    this.subWishList = this.wishlistService.addProductToWishList(id).subscribe({
      next: (res) => {
       
        if (res.status === "success") {
          this.toastrService.success(res.message, 'Fresh Cart');
          this.toggleWishlist(id); 
        }

        
      }

    })

  }

 toggleWishlist(productId: string): void {
    if (this.wishList.has(productId)) {
      this.wishList.delete(productId);
    } else {
      this.wishList.add(productId);
    }
    this.saveWishList();
  }

  isProductInWishlist(productId: string): boolean {
    return this.wishList.has(productId);
  }

  saveWishList(): void {
    if(isPlatformBrowser(this.id)){
      localStorage.setItem('wishList', JSON.stringify(Array.from(this.wishList)));
    }

  }

  loadWishList(): void {
    const storedWishlist = localStorage.getItem('wishList');
    if (storedWishlist) {
      this.wishList = new Set(JSON.parse(storedWishlist));
    }
  }







  ngOnDestroy(): void {
    this.subBroduct.unsubscribe();
    this.subCart.unsubscribe();
    
  }

}
