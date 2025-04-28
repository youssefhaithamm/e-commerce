import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Icategories } from '../../shared/interfaces/icategories';
import { Subscription } from 'rxjs';
import { tick } from '@angular/core/testing';


@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit ,OnDestroy {
  private readonly categoriesService= inject(CategoriesService);
   private readonly ngxSpinnerService= inject(NgxSpinnerService);
   categories :WritableSignal<Icategories[]> =signal([]);
   subCategory:Subscription=new Subscription();

   ngOnInit(): void {
    this.getCategoriesData();
     
   }
   getCategoriesData():void{

    this.ngxSpinnerService.show()
   this.subCategory= this.categoriesService.getAllGategories().subscribe({
      next:(res)=>{
     
        this.categories.set(res.data);

        this.ngxSpinnerService.hide()
        
      }

    })
  }


  ngOnDestroy(): void {
    this.subCategory.unsubscribe();
  }


}
