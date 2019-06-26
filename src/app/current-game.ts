import { Game } from './game';

export let GAME: Game = new Game();

GAME.players[0].dev.push({name: 'knight', effect: ''});
GAME.players[0].dev.push({name: 'monopoly', effect: ''});
GAME.players[0].dev.push({name: 'victory', effect: ''});
