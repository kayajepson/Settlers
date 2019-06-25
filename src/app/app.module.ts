import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoardGridComponent } from './board-grid/board-grid.component';
import { DiceComponent } from './dice/dice.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardGridComponent,
    DiceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
