import { Component, OnInit } from '@angular/core';
import { GAME } from './../current-game';

@Component({
  selector: 'app-board-grid',
  templateUrl: './board-grid.component.html',
  styleUrls: ['./board-grid.component.css']
})
export class BoardGridComponent implements OnInit {
row1: {resource: string, roll:number}[];
row2: {resource: string, roll:number}[];
row3: {resource: string, roll:number}[];
row4: {resource: string, roll:number}[];
row5: {resource: string, roll:number}[];
dictionary: {2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string, 9: string, 10: string, 11: string, 12: string };


  constructor() { }

  ngOnInit() {
    this.dictionary =
    {2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve"}



    this.row1 = GAME.board.slice(0,3);
    console.log(this.row1);

    console.log(this.row1[0].roll);

    this.row2 = GAME.board.slice(3,7);
    console.log(this.row2);

    this.row3 = GAME.board.slice(7,12);
    console.log(this.row3);

    this.row4 = GAME.board.slice(12,16);
    console.log(this.row4);

    this.row5 = GAME.board.slice(16);
    console.log(this.row5);

    console.log("here", GAME)
  }

}
