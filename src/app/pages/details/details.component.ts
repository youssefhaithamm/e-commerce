import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-details',
  imports: [ CarouselModule ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit ,OnDestroy {

  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly productsService=inject(ProductsService);
  private readonly cartService=inject(CartService)
   private readonly toastrService = inject(ToastrService);
     subBroduct:Subscription=new Subscription();
     subActive:Subscription=new Subscription();

  detailsProduct:Iproduct| null = null;
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
      0: {
        items: 1,
        nav: false
      },
      480: {
        items: 1
      },
      768: {
        items: 2
      },
      1024: {
        items: 3
      }
    }
  
  }



  ngOnInit(): void {
   this.subActive= this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
         let idPrduct=  p.get('id');

        //call api 
        this.productsService.getSpecificProduct(idPrduct).subscribe({
          next:(res)=>{
          this.detailsProduct= res.data;
          }
        })


      }
    })

    
  }

 
  addToCart(id: string): void {
   this.subBroduct= this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
       
        if (res.status === "success") {
          this.toastrService.success(res.message, 'Fresh Cart')
          this.cartService.cartNumber.set(res.numOfCartItems);
         
        }

      }
    })


  }


  ngOnDestroy(): void {
    this.subActive.unsubscribe();
    this.subBroduct.unsubscribe();
  }

}
