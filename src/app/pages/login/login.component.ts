import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService= inject(AuthService);
    private readonly router = inject(Router);
    isloading:boolean = false;
    msError:string='';
    isSuccess:string='';
  
  
  
    loginForm:FormGroup = new FormGroup({
     
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-z]\w{7,}$/)]),
     
    })
  
  
    submitForm():void{
     if(this.loginForm.valid){
      this.isloading=true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
      
          if(res.message === 'success'){
            this.isloading=false;
           
          setTimeout(() => {

            localStorage.setItem('userToken',res.token);

            this.authService.saveUserData();
            
            this.router.navigate(['/home']);
          }, 500);

            this.isSuccess=res.message;
            
          }
        },

        error:(err)=>{
          this.isloading=false;
         
          this.msError= err.error.message;

        }       
      })
     }
    }
  

}
