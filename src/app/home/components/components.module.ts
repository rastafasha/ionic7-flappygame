import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObstacleComponent } from './obstacle/obstacle.component';
import { BirdComponent } from './bird/bird.component';



@NgModule({
  declarations: [
    BirdComponent,
    ObstacleComponent
  ],
  exports: [
    BirdComponent,
    ObstacleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
