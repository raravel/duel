import { random, randomMultiple } from './../utils/common';
import { Player } from '../interface/player';
import { CardTypes } from "../const/card-type";
import { Card } from "../interface/card";
import { Priority } from "../const/priority";
import { rand, randomPick } from "../utils/common";
import { DamageType } from "../const/damage-type";
import { GameEvents } from '../const/game-event';
import { Class } from '../interface/constructable';

export class Clown extends Card {
	public name = '광대';
	public type = CardTypes.Magic;
	public priority: number = Priority.VeryHigh;

	constructor(protected player: Player) {
		super(player);
		this.player.history.debug(`[${this.player.name}] 님에게 [${this.name}] 카드가 초기화 되었으므로 이벤트를 추가합니다. (${GameEvents.PLAYER_TURN_START})`);
		this.player.on(GameEvents.PLAYER_TURN_START, this.onTurnStart);
	}

	onTurnStart() {
		const skipThisTurn = randomPick([
			[90, true],
			[10, false],
		]);
		if ( skipThisTurn ) {
			return;
		}

		this.player.history.log(`덱에서 광대의 웃음소리가 울려퍼집니다.`);
		const card = random(this.player.cardList.filter((card) => card.type === CardTypes.Magic));
		const CardClass: Class<Card> = card.constructor;
		const copyedCard = new CardClass(this.player);
		this.player.history.log(`광대가 복사한 카드는 [${copyedCard.name}] 입니다.`);
		this.player.useCard(copyedCard);
	}

	trigger(opponent: Player): void {
		this.player.delete(GameEvents.PLAYER_TURN_START, this.onTurnStart);
		this.player.history.debug(`[${this.player.name}]의 [${this.name}] 카드 이벤트를 제거합니다.`);
		const cards = randomMultiple(
			this.player.hand.map((card) => card.constructor as Class<Card>),
			3,
		).map((card) => new card(this.player))
		.map((card) => {
			const pick = rand(this.player.cardList.length+1);
			this.player.cardList.splice(pick, 0, card);
			return card.name;
		});
		this.player.history.log(`광대가 요술을 부려 패에 있는 [${cards.join('],[')}] 카드를 복사해 덱에 섞었습니다.`);
	}
}