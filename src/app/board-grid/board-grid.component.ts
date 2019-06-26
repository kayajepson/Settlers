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
dictionary: {0: string,2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string, 9: string, 10: string, 11: string, 12: string };
robber: number;
settlement: boolean;
road: boolean;
  constructor() { }

  ngOnInit() {
    this.dictionary =
    {0: "zero", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve"}

    let rob = 0;
    for(let i = 0; i < 19; i++){
      if(GAME.board[i].resource === "desert"){
        rob = i;
        break;
      }
    }

    console.log(rob);
  this.robber = rob;
  document.querySelector("#h"+(this.robber+1))
  let robspot = document.querySelector("#h"+(this.robber+1));
  console.log(robspot);
  let num = robspot.lastElementChild;
  num.setAttribute("id","robber");
  console.log(num.classList);

    this.row1 = GAME.board.slice(0,3);

    this.row2 = GAME.board.slice(3,7);

    this.row3 = GAME.board.slice(7,12);

    this.row4 = GAME.board.slice(12,16);

    this.row5 = GAME.board.slice(16);


    this.settlement = true;
    this.road = false;
  }
  build(num: number){
    //document.getElementById("s"+num).setAttribute("class",GAME.players[GAME.turn].name)
    console.log(num);
    if(GAME.checkNeighbors(num) === true && this.settlement === true){
      document.getElementById("s"+num).classList.add(GAME.players[GAME.turn].name);
      console.log(GAME.players[GAME.turn].name);
      GAME.buildSettlement(num);
      console.log(GAME);
      this.settlement = false;
      if(GAME.preturn > 0){
        this.road = true;
      }
    }
  }
  buildRoad(roadOne: number, roadTwo: number){
    if(this.road === true){
      if((GAME.players[GAME.turn].resources.wood > 0 && GAME.players[GAME.turn].resources.brick > 0)){
        let connected = false;
        let otherEnds1 = document.getElementsByClassName("road " + GAME.players[GAME.turn].name);
        for(let i = 0; i < otherEnds1.length; i++){
          console.log("HERE?");
          if(otherEnds1[i].classList.contains("r" +roadOne) === true || otherEnds1[i].classList.contains("r" + roadTwo) === true)
          {
            connected = true;
          }
        }
        if(GAME.players[GAME.turn].build.filter(function(x){
          return (x.position === roadOne || x.position === roadTwo);
        }).length > 0 || connected === true){
          //console.log(otherEnds1);
          document.querySelector(".r"+roadOne+".r"+roadTwo).classList.add(GAME.players[GAME.turn].name);
          // document.querySelector(".r"+roadOne+".r"+roadTwo).classList.remove("road");
          GAME.players[GAME.turn].resources.wood--;
          GAME.players[GAME.turn].resources.brick--;
          if(GAME.preturn === 1) {
            GAME.turn--;
            if(GAME.turn === -1){
              GAME.preturn --;
            }
          } else {
            GAME.turn++;
          }
          if(GAME.turn === 4 && GAME.preturn === 2){
            GAME.preturn--;
            GAME.turn--;
          }
          if(GAME.preturn > 0){
            this.settlement = true;
          }
        }
        }
      }
    }

  }
