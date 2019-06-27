import { Component, OnInit } from '@angular/core';
import { GAME } from './../current-game';
import { Game } from './../game';

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
city: boolean;
road: boolean;
moveRob: boolean;
selResource: string;
roadBuilding: number;
// resources: {wood: number,
// wheat: number,
// brick: number,
// ore: number,
// sheep: number}[]
game: Game;
rolls: number[];

  constructor() { }

  ngOnInit() {
    this.roadBuilding = 0;
    this.selResource = "";
    this.city = false;
    this.dictionary =
    {0: "zero", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve"}
    this.game = GAME;
    let rob = 0;
    for(let i = 0; i < 19; i++){
      if(GAME.board[i].resource === "desert"){
        rob = i;
        break;
      }
    }

    console.log(rob);
    this.moveRob = false;
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
    this.rolls = [1,2];

  }

  diceRoll(){
    if(!(this.moveRob || this.settlement || this.road)){
      this.rolls = GAME.roll();
      if(this.rolls[0]+this.rolls[1] === 7){
        this.moveRob = true;
      }
      this.selResource = "";
    }
  }

  moveRobert(num) {
    if(this.moveRob === true) {
      document.querySelector("#robber").removeAttribute("id");
      GAME.robert(num-1);
      this.robber = num-1;
      document.querySelector("#h"+(this.robber+1))
      let robspot = document.querySelector("#h"+(this.robber+1));
      console.log(robspot);
      let numb = robspot.lastElementChild;
      numb.setAttribute("id","robber");
      console.log(numb.classList);
      this.moveRob = false;
    }
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
      if (num === 4 || num === 1) {
        GAME.players[GAME.turn].dev.push({name: "three-one-any", effect: ""})
      } else if (num === 2 || num === 6) {
        GAME.players[GAME.turn].dev.push({name: "three-one-any", effect: ""})
      } else if (num === 15 || num === 20) {
        GAME.players[GAME.turn].dev.push({name: "two-one-brick", effect: ""})
      } else if (num === 15 || num === 20) {
        GAME.players[GAME.turn].dev.push({name: "two-one-brick", effect: ""})
      } else if (num === 37 || num === 42) {
        GAME.players[GAME.turn].dev.push({name: "two-one-wood", effect: ""})
      } else if (num === 50 || num === 53) {
        GAME.players[GAME.turn].dev.push({name: "three-one-any", effect: ""})
      } else if (num === 48 || num === 52) {
        GAME.players[GAME.turn].dev.push({name: "two-one-wheat", effect: ""})
      } else if (num === 38 || num === 43) {
        GAME.players[GAME.turn].dev.push({name: "two-one-ore", effect: ""})
      } else if (num === 21 || num === 27) {
        GAME.players[GAME.turn].dev.push({name: "three-one-any", effect: ""})
      } else if (num === 11 || num === 7) {
        GAME.players[GAME.turn].dev.push({name: "two-one-sheep", effect: ""})
      }
      GAME.players[GAME.turn].vp++;
    }
    console.log(this.city);
    if(this.city === true){
      this.buildCity(num);
    }
  }

  dummy(){
}

select(resource){
  this.selResource = resource;
}

  devCard(card){
    if(card === 'knight'){
      this.moveRob = true;
      GAME.players[GAME.turn].army++;
      const slicer = GAME.players[GAME.turn].dev.filter((x)=> x.name === "knight");
      GAME.players[GAME.turn].dev = GAME.players[GAME.turn].dev.slice(0,GAME.players[GAME.turn].dev.indexOf(slicer[0])).concat(GAME.players[GAME.turn].dev.slice(GAME.players[GAME.turn].dev.indexOf(slicer[0])+1));
    }
    if(card === 'monopoly' && this.selResource != ""){

      for(let i = 0; i < 4; i++){
        if(i !== GAME.turn){
          GAME.players[GAME.turn].resources[this.selResource] += GAME.players[i].resources[this.selResource];
          GAME.players[i].resources[this.selResource] = 0;
        }
      }
      GAME.dev.push({
        name: "monopoly", effect: "When you play this card, announce 1 type of resource. All other players must give you all their resource cards of that type."
      })
      const slicer = GAME.players[GAME.turn].dev.filter((x)=> x.name === "monopoly");
      GAME.players[GAME.turn].dev = GAME.players[GAME.turn].dev.slice(0,GAME.players[GAME.turn].dev.indexOf(slicer[0])).concat(GAME.players[GAME.turn].dev.slice(GAME.players[GAME.turn].dev.indexOf(slicer[0])+1));
    }
    if(card === 'yearOfPlenty' && this.selResource != ""){
          GAME.players[GAME.turn].resources[this.selResource] += 2;

      GAME.dev.push({
        name: "yearOfPlenty", effect: ""
      })
      const slicer = GAME.players[GAME.turn].dev.filter((x)=> x.name === "yearOfPlenty");
      GAME.players[GAME.turn].dev = GAME.players[GAME.turn].dev.slice(0,GAME.players[GAME.turn].dev.indexOf(slicer[0])).concat(GAME.players[GAME.turn].dev.slice(GAME.players[GAME.turn].dev.indexOf(slicer[0])+1));
    }
    if(card === "roadBuilding"){
      this.road = true;
      this.roadBuilding = 1;
      GAME.dev.push({
        name: "roadBuilding", effect: ""
      })
      GAME.players[GAME.turn].resources.wood+=2;
      GAME.players[GAME.turn].resources.brick+=2;
      const slicer = GAME.players[GAME.turn].dev.filter((x)=> x.name === "roadBuilding");
      GAME.players[GAME.turn].dev = GAME.players[GAME.turn].dev.slice(0,GAME.players[GAME.turn].dev.indexOf(slicer[0])).concat(GAME.players[GAME.turn].dev.slice(GAME.players[GAME.turn].dev.indexOf(slicer[0])+1));
    }
    console.log(GAME);
  }


// knight(){
//
// }
//
//
// victory(){
//
// }
  buildARoad(){
    if((GAME.players[GAME.turn].resources.wood > 0 && GAME.players[GAME.turn].resources.brick > 0)){
      this.road = true;
    }
}

buildACity(){
  if((GAME.players[GAME.turn].resources.ore >= 3 && GAME.players[GAME.turn].resources.wheat >= 2)){
    this.city = true;
  }
  console.log(this.city);
}

buildCity(location){
  if(this.city === true){
    if(document.querySelector("#s"+location).classList.contains(GAME.players[GAME.turn].name) === true){
      document.querySelector("#s"+location).classList.add("city");
      document.querySelector("#s"+location).classList.remove("settlement");
      GAME.players[GAME.turn].resources.ore -= 3;
      GAME.players[GAME.turn].resources.wheat -= 2;
      GAME.players[GAME.turn].build.push({name: 'settlement', position: location, resources: []})
      this.city = false;
      GAME.players[GAME.turn].vp++;
    }
  }

}

getDev(){
  if((GAME.players[GAME.turn].resources.sheep > 0 && GAME.players[GAME.turn].resources.wheat > 0 && GAME.players[GAME.turn].resources.ore > 0)){
    GAME.getDev();
    GAME.players[GAME.turn].resources.ore--;
    GAME.players[GAME.turn].resources.wheat--;
    GAME.players[GAME.turn].resources.sheep--;
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
              GAME.turn = 0;
            }
          } else if(GAME.preturn === 2){
            GAME.turn++;
          }
          if(GAME.turn === 4 && GAME.preturn === 2){
            GAME.preturn--;
            GAME.turn--;
          }
          if(GAME.preturn > 0){
            this.settlement = true;
          }else{
            if(this.roadBuilding === 0){
              this.road = false;

            }
            this.settlement = false;
            this.roadBuilding--;
          }
          console.log(this);
        }
        }
      }
    }



  }
