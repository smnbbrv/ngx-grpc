import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExamplePageComponent } from './example-page/example-page.component';

@NgModule({
  declarations: [ExamplePageComponent],
  exports: [ExamplePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
  ],
})
export class ExamplePageModule { }
