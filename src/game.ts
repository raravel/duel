import { GameEvents } from "./const/game-event";
import { Player } from "./interface/player";

export function duel(player1: Player, player2: Player) {
	let turn = 1;
	const history: any[] = [];

	player1.emit(GameEvents.INITIALIZE, history)

	while ( !player1.isDead && !player2.isDead ) {

	}
}