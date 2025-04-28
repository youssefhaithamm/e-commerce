import { resolve } from 'node:path';
import { AfterViewInit, Component, computed, ElementRef, inject, input, InputSignal, OnDestroy, OnInit, PLATFORM_ID, Signal, ViewChild } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit ,AfterViewInit,OnDestroy {
  private readonly CartService = inject(CartService);
  cartCount:Signal<number> = computed(()=> this.CartService.cartNumber())
   subCart:Subscription=new Subscription();
   private id = inject(PLATFORM_ID)

  isLogin:InputSignal<boolean> =input<boolean>(true);
  private readonly authService=inject(AuthService);
  @ViewChild('navbarToggle') navbarToggle!: ElementRef;
  @ViewChild('navbarMenu') navbarMenu!: ElementRef;


  ngOnInit(): void {

    if(isPlatformBrowser(this.id)){
      if(localStorage.getItem('userToken')){
        this.subCart= this.CartService.getLogedUserCart().subscribe({
          next:(res)=>{
            this.CartService.cartNumber.set(res.numOfCartItems);
          }
         })
      }
    }
 
 
    
  }

  logout():void{
    this.authService.logOut();
  }

 

  ngAfterViewInit(): void {
    this.navbarToggle.nativeElement.addEventListener('click', () => {
      this.toggleMenu();
    });
  }

  toggleMenu(): void {
    const menu = this.navbarMenu.nativeElement;
    menu.classList.toggle('hidden');
  }


  ngOnDestroy(): void {
    this.subCart.unsubscribe();
    
  }

}
