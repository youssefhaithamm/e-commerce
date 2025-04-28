
import { Component, ElementRef, inject, OnDestroy, OnInit, PLATFORM_ID, signal, ViewChild, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategories } from '../../shared/interfaces/icategories';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishList/wishlist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly CartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  private id = inject(PLATFORM_ID);

  subBroduct: Subscription = new Subscription();
  subCart: Subscription = new Subscription();
  subCategory: Subscription = new Subscription();
  subWishList: Subscription = new Subscription();

  products: WritableSignal<Iproduct[]> = signal([]);
  categories: WritableSignal<Icategories[]> = signal([]);
  wishList: Set<string> = new Set(); // استخدام Set بدلاً من مصفوفة لتحسين الأداء

  @ViewChild('heartIcon') heartIcon!: ElementRef;

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 6 }
    },
    nav: false
  };

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
    this.loadWishList(); 
  }

  getProductsData(): void {
    this.ngxSpinnerService.show();
    this.subBroduct = this.productsService.getAllProduct().subscribe({
      next: (res) => {
        this.products.set(res.data);
        this.ngxSpinnerService.hide();
      },
      
    });
  }

  getCategoriesData(): void {
    this.ngxSpinnerService.show();
    this.subCategory = this.categoriesService.getAllGategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
        this.ngxSpinnerService.hide();
      },
    
    });
  }

  addToCart(id: string): void {
    this.subCart = this.CartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.toastrService.success(res.message, 'Fresh Cart');
          this.CartService.cartNumber.set(res.numOfCartItems);
        }
      },
 
    });
  }

  addToWish(id: string): void {
    this.subWishList = this.wishlistService.addProductToWishList(id).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.toastrService.success(res.message, 'Fresh Cart');
          this.toggleWishlist(id); // تحديث الحالة
        }
      }
    });
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
    this.subCategory.unsubscribe();
    this.subWishList.unsubscribe();
  }
}
