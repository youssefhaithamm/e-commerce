import { Ibrands } from './../../shared/interfaces/ibrands';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { unsubscribe } from 'diagnostics_channel';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy {
  private readonly brandsService = inject(BrandsService);
  brands :WritableSignal<Ibrands[]> =signal([]);
  isToggelLightBox:boolean= false;
  currentData:Ibrands={} as Ibrands;
  subBrands:Subscription = new Subscription()



  ngOnInit(): void {
    this.getBrandsData();
    
  }

  getBrandsData():void{
   this.subBrands= this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
      
        this.brands.set(res.data)
      },
    
    })
  }

  toggelightBox():void{
    this.isToggelLightBox= !this.isToggelLightBox;

  }
  stopPop($event:Event):void{
    $event.stopPropagation();

  }
  currentItem(brand:Ibrands):void{
    this.currentData= brand ;

  }


ngOnDestroy(): void {
 this.subBrands.unsubscribe()
}


}
