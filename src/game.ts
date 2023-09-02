import { GameEvents } from "./const/game-event";
import { Card } from "./interface/card";
import { Class } from "./interface/constructable";
import { Player } from "./interface/player";
import { rand, shuffle } from "./utils/common";
import { HistoryInstance } from "./utils/history";

function turnDraw(player: Player, cardNum: number) {
	return new Array(cardNum).fill(0)
		.map((_, i) => player.draw());
}

function deckCopy(player: Player) {
	const array = player.deck;
	for (let i = 0;i < array.length; i++) {
		const CardConstructor = array[i].constructor as Class<Card>;
		player.cardList.push(new CardConstructor(player));
	}
}

export function duel(player1: Player, player2: Player) {
	const history = new HistoryInstance();
	history.log(`플레이어 ${player1.name}님과 플레이어 ${player2.name}님의 듀얼이 시작됩니다.`);

	player1.history = history;
	player2.history = history;

	player1.opponent = player2;
	player2.opponent = player1;

	deckCopy(player1);
	deckCopy(player2);
	shuffle(player1.cardList);
	shuffle(player2.cardList);

	player1.emit(GameEvents.INITIALIZE);
	player2.emit(GameEvents.INITIALIZE);

	const coinToss = rand(2); // 0: front, 1: back
	let currentTurnPlayer = coinToss === 0 ? player1 : player2;
	let currentTurnOpponent = coinToss === 0? player2 : player1;

	history.log(`동전을 던집니다. 결과는 [${coinToss === 0 ? '앞' : '뒤'}]`);
	history.log(`플레이어 ${currentTurnPlayer.name}님이 선공합니다.`);
	let turn = 1;

	while ( !player1.isDead && !player2.isDead ) {
		history.log(`플레이어 ${currentTurnPlayer.name}님의 턴 시작 <${turn}>`);
		currentTurnPlayer.hand = turnDraw(currentTurnPlayer, 5);
		
		history.log(`드로우! 카드 [${currentTurnPlayer.hand.map(c => c.name).join('],[')}]를 패에 획득`);
		currentTurnPlayer.emit(GameEvents.PLAYER_TURN_START);
	
		while ( currentTurnPlayer.hand.length ) {
			const card = currentTurnPlayer.hand.shift();
			if ( card ) {
            	currentTurnPlayer.useCard(card);
			}
		}

		// 공수 교체
		if ( currentTurnPlayer === player1 ) {
			currentTurnPlayer = player2;
            currentTurnOpponent = player1;
		} else {
			currentTurnPlayer = player1;
			currentTurnOpponent = player2;
		}

		history.log(`플레이어 [${player1.name}] 님의 남은 체력: ${player1.hp}`);
		history.log(`플레이어 [${player2.name}] 님의 남은 체력: ${player2.hp}`);
		
		turn += 1;
	}

	return history;
}