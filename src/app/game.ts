export class Game{
  dev: {name: string, effect: string}[];
  players: {
    name: string,
    resources: {
      wheat: number,
      sheep: number,
      ore: number,
      brick: number,
      wood: number},
      dev: {name: string, effect: string}[],
      vp: number,
      road: number,
      army: number,
      //add adjacent property later
      build: {name: string, position: number, resources: string[]}[]
    }[];
    preturn: number;
    turn: number;
    board: {resource: string, roll: number}[];
    rob: number;
    adjacents: number[][];

    constructor(){
      this.board = [];
      this.players = [];
      this.boardSetup();
      this.dev = [];
      this.devCards();
      this.shuffle(this.dev);

      for(let i = 0; i < 4; i++){
        this.players.push({
          name: "", resources:{ wheat: 0, sheep: 0, ore: 0, brick: 0, wood: 0}, dev: [], vp: 0, road: 0, army: 0, build: []
        })
      }
      this.players[0].name = "red";
      this.players[1].name = "white";
      this.players[2].name = "blue";
      this.players[3].name = "orange";
      this.preturn = 2;
      this.turn = 0;
      this.adjacents = [];
      this.fillAdjacents();
    }

    fillAdjacents(){
      this.adjacents.push([0,3,4,7,8,12]);
      this.adjacents.push([1,4,5,8,9,13]);
      this.adjacents.push([2,5,6,9,10,14]);
      this.adjacents.push([7,11,12,16,17,22]);
      this.adjacents.push([8,12,13,17,18,23]);
      this.adjacents.push([9,13,14,18,19,24]);
      this.adjacents.push([10,14,15,19,20,25]);
      this.adjacents.push([16,21,22,27,28,33]);
      this.adjacents.push([17,22,23,28,29,34]);
      this.adjacents.push([18,23,24,29,30,35]);
      this.adjacents.push([19,24,25,30,31,36]);
      this.adjacents.push([20,25,26,31,32,37]);
      this.adjacents.push([28,33,34,38,39,43]);
      this.adjacents.push([29,34,35,39,40,44]);
      this.adjacents.push([30,35,36,40,41,45]);
      this.adjacents.push([31,36,37,41,42,46]);
      this.adjacents.push([39,43,44,47,48,51]);
      this.adjacents.push([40,44,45,48,49,52]);
      this.adjacents.push([41,45,46,49,50,53]);
    }

    giveResources(roll){
      let locations = [];
      let that = this;
      this.board.forEach(function(b){
      if(b.roll === roll)
        locations.push(that.board.indexOf(b));
      })
      this.players.forEach(function(p){
        p.build.forEach(function(pp){
            locations.forEach(function(l){

              console.log(pp.position);
              console.log(that.adjacents[l]);
              if(that.adjacents[l].includes(pp.position)===true){
              p.resources[that.board[l].resource]++;
              }
            })
        })
      })
    }

    devCards() {
      for(let i = 0; i < 14; i++) {
        this.dev.push({
          name: "knight", effect: "Move the robber. Steal 1 resource card from the owner of an adjacent settlement or city."
        });
      }
      for(let i = 0; i < 5; i++) {
        this.dev.push({
          name: "victory", effect: "1 victory point."
        });
      }
      for(let i = 0; i < 2; i++) {
        this.dev.push({
          name: "road building", effect: "Place 2 new roads as if you had just built them."
        });
        this.dev.push({
          name: "year of plenty", effect: "Take any 2 resources from the bank. Add them to your hand. They can be 2 of the same resource or 2 different resources."
        });
        this.dev.push({
          name: "monopoly", effect: "When you play this card, announce 1 type of resource. All other players must give you all their resource cards of that type."
        });
      }
    }

    getDev() {
      if(this.dev[0].name === "victory") {
        this.dev.pop();
        this.players[this.turn].vp++;
      } else {
        this.players[this.turn].dev.push(this.dev.pop());
      }
    }

    roll() {
      let rolls = [];
      rolls.push(Math.floor(Math.random()* 6) + 1);
      rolls.push(Math.floor(Math.random()* 6) + 1);
      this.giveResources(rolls[0]+rolls[1]);
      console.log(this);
      return rolls;
    }



    shuffle(deck) {
      let i = 0;
      let j = 0;
      let temp = null;
      for (i = deck.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
      }
      return deck;
    }

    boardSetup(){
      let pieces = [];
      for(let i = 0; i < 4; i++){
        if(i !== 3){
          pieces.push("brick");
          pieces.push("ore");
        }
        if(i === 0){
          pieces.push("desert");
        }
        pieces.push("wood");
        pieces.push("wheat");
        pieces.push("sheep");
      }

      pieces = this.shuffle(pieces);

      let nums = [2,12];

      for(let i = 3; i < 12;i++){
        if(i !== 7){
          nums.push(i);
          nums.push(i);
        }
      }

      console.log(nums);

      nums = this.shuffle(nums);
      let desert = 0;
      for(let i = 0; i < pieces.length;i++){
        if(pieces[i] !== "desert"){
          this.board.push({resource: pieces[i], roll: nums[i-desert]})
        }else{
          desert=1;;
          this.board.push({resource: pieces[i], roll: 0})
        }
      }
    }

    checkNeighbors(number){
      return true;
    }

    //Eventually take in more info
    preTurn(number, resources) {
    if (this.checkNeighbors(number) === true) {
      //let currentPlayer = this.players[this.turn]
      this.players[this.turn].build.push({name: 'settlement', position: number, resources: resources});

      //distribute resources
      if(this.preturn === 1){
        resources.forEach(function(resource) {
          this.players[this.turn].resources[resource]++;
        });
      }

      if(this.turn === 3) {
        this.preturn--;
      }
      if(this.preturn === 1) {
        this.turn--;
      } else {
        this.turn++;
      }
    }
  }




}
