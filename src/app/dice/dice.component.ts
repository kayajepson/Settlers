import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GAME } from './../current-game';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})

export class DiceComponent implements OnInit {
  constructor() { }
rolls: number[];
  ngOnInit() {
    this.rolls = [1,2];
  }

  diceRoll(){
    this.rolls = GAME.roll();
  }
}
