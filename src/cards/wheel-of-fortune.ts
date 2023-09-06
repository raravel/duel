import { CardTypes } from "../const/card-type";
import { Card } from "../interface/card";
import { Priority } from "../const/priority";
import { Player } from "../interface/player";
import { cardListCopy, rand, random } from "../utils/common";

export class WheelOfFortune extends Card {
	public name = '운명의 수레바퀴';
	public type = CardTypes.Magic;
	public priority: number = Priority.VeryHigh;

	trigger(opponent: Player): void {
		const callback: Function = random([
			this.deckChange,
			this.purification,
			this.necroCard,
			this.meteorShower,
		]);

		this.player.history.log(`[${this.player.name}] 님의 운명이 덜그럭 소리를 냅니다.`);
		callback.call(this);
	}

	deckChange() {
		this.player.history.log(`수레바퀴가 머무른 운명은 [뒤집힌 세계]입니다.`);
		const temp = cardListCopy(this.player.opponent, this.player.cardList);
		this.player.cardList = cardListCopy(this.player, this.player.opponent.cardList);
		this.player.opponent.cardList = temp;
		this.player.history.log(`두 플레이어의 남은 덱이 바뀌었습니다.`);
	}

	purification() {
		this.player.history.log(`수레바퀴가 머무른 운명은 [안타레스의 성화]입니다.`);
		this.player.opponent.buffs.get()
			.filter((buff) => buff.isPurificationPossible)
			.forEach((buff) => buff.deinitialize());
		this.player.buffs.get()
			.filter((buff) => buff.isPurificationPossible)
			.forEach((buff) => buff.deinitialize());
		this.player.history.log(`안타레스의 불이 필드에 있는 모든 버프,디버프를 정화시켰습니다.`);
	}

	necroCard() {
		this.player.history.log(`수레바퀴가 머무른 운명은 [망령의 지배자]입니다.`);
		this.player.history.log(`묘비에 있는 카드들에 망령의 힘이 깃듭니다.`);
		const usedCardList = cardListCopy(this.player, this.player.usedCardList);
		for ( const card of usedCardList ) {
			this.player.history.log(`[${card.name}]카드 사용.`);
			card.trigger(this.player.opponent);
			if ( card.type === CardTypes.Attack ) {
				break;
			}
		}
	}

	meteorShower() {
		this.player.history.log(`수레바퀴가 머무른 운명은 [종말의 부름]입니다.`);
		const playerStack: number[] = [];
		const opponentStack: number[] = [];

		for ( let i = 0; i < 10;i++ ) {
			if ( rand(2) === 0 ) {
				// player
				playerStack.push(this.player.attack(this.player, 250));
			} else {
				// opponent
				opponentStack.push(this.player.attack(this.player.opponent, 250));
			}
		}
		this.player.history.log(`[${this.player.name}] 님은 운석에 맞아 [${playerStack.join('],[')}] 데미지를 입었습니다.`);
		this.player.history.log(`[${this.player.opponent.name}] 님은 운석에 맞아 [${opponentStack.join('],[')}] 데미지를 입었습니다.`);
	}

}