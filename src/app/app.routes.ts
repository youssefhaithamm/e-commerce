import { authGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RegisterComponent } from './pages/register/register.component';
import { loginGuard } from './core/guards/login.guard';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';

export const routes: Routes = [
    {path:"",redirectTo:"login",pathMatch:"full"},
    {path:"", component:AuthLayoutComponent,canActivate:[loginGuard] , children:[
        {path:"login", component:LoginComponent,title:"login"},
        {path:"register",component:RegisterComponent,title:"register"},
       { path: "forgot", loadComponent: () => import("./pages/forgotpassword/forgotpassword.component").then(c => c.ForgotpasswordComponent), title: "Forgot Password" }
        
    ]},
    {path:"", component:BlankLayoutComponent,canActivate:[authGuard] , children:[
        {path:"home",loadComponent:()=>import("./pages/home/home.component").then((c)=>c.HomeComponent),title:"Home"},
        {path:"cart",loadComponent:()=>import("./pages/cart/cart.component").then((c)=>c.CartComponent),title:"Cart"},
        {path:"brands",loadComponent:()=>import("./pages/brands/brands.component").then((c)=>c.BrandsComponent),title:"Brands"},
        {path:"categories",loadComponent:()=>import("./pages/categories/categories.component").then((c)=>c.CategoriesComponent),title:"Categories"},
        {path:"product", loadComponent:()=>import("./pages/products/products.component").then((c)=>c.ProductsComponent),title:"Product"},
        {path:"allorders", loadComponent:()=>import("./pages/all-order/all-order.component").then((c)=>c.AllOrderComponent),title:"All Orders"},
        {path:"checkout/:id",loadComponent:()=>import("./pages/checkout/checkout.component").then((c)=>c.CheckoutComponent),title:"checkout"},
        {path:"details/:id",loadComponent:()=>import("./pages/details/details.component").then((c)=>c.DetailsComponent),title:"Details"},
        {path:"wishList",loadComponent:()=>import("./pages/wish-list/wish-list.component").then((c)=>c.WishListComponent),title:"wishList"},
    ]},
    {path:"**",component:NotfoundComponent,title:"NotFound"}
];



