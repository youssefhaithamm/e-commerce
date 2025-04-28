import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  private readonly authService= inject(AuthService);
  private readonly router= inject(Router);
  isloading:boolean = false;

  step:number= 1;

  verifyEmail:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),

  })


  
  verifyCode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/) ])

  })


  resetPassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-z]\w{7,}$/)])

  });





  verifyEmailSubmit():void{
 if(this.verifyEmail.valid){
this.isloading=true
  this.authService.setEmailVerify( this.verifyEmail.value).subscribe({
    next:(res)=>{
  
      if(res.statusMsg==='success'){
        this.step=2;
      }

    },
    error:(err)=>{

    }
  })
 }
  }


  verifyCodeSubmit():void{
   if(this.verifyCode.valid){
    this.isloading=true;
    this.authService.setCodeVerify( this.verifyCode.value).subscribe({
      next:(res)=>{
       
        if(res.status==='Success'){
          this.step=3;
        }

      },
      error:(err)=>{

      }
    })
   }
  }




  
  resetPasswordSubmit():void{
      this.authService.setresetPassword(this.resetPassword.value).subscribe({
        next:(res)=>{
          console.log('successssssss',res);
          let data= res.token;
         localStorage.setItem('userToken',data);
         this.authService.saveUserData();
         this.router.navigate(['/home']);
  
        },
        error:(err)=>{
          console.log( 'errorrrrrrrrrrrrrrrrrrrrrrr',err.message)
  
        }
      })
    
  }

















}
