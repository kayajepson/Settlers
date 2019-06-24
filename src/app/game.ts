export class Game{
  dev: {name: string, effect: string};
  players: {
    name: string,
    resources: {
      wheat: number,
      sheep: number,
      ore: number,
      brick: number,
      wood: number},
      dev: {}[],
      vp: number,
      road: number,
      army: number,
      //add adjacent property later
      build: {name: string, position: number, resources: string[]}[]
    }[];
    preturn: number;
    turn: number;
    board: {resource: string, roll: number}[];
    rob: number

    constructor(){
      this.board = [];
      this.players = [];
      this.boardSetup();
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
      
      nums = this.shuffle(nums);
      let desert = 0;
      for(let i = 0; i < pieces.length;i++){
        if(pieces[i] !== "desert"){
          this.board.push({resource: pieces[i], roll: nums[i-desert]})
        }else{
          desert++;
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
