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
  army: number
}[];
turn: number;
board: {resource: string, roll: number}[];
rob: number;
build: {name: string, position: number, player: number}[]

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
    for(let i = 0; i < 5; i++){
      if(i !== 4){
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
      nums.push(i);
      nums.push(i);
    }
    nums = this.shuffle(nums);
    for(let i = 0; i < pieces.length;i++){
      if(pieces[i] !== "desert"){
        this.board.push({resource: pieces[i], roll: nums[i]})
      }else{
        this.board.push({resource: pieces[i], roll: 0})
      }
    }
  }

}
