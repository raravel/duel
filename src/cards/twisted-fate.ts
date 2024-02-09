import { CardTypes } from "../const/card-type";
import { Card } from "../interface/card";
import { Priority } from "../const/priority";
import { Player } from "../interface/player";
import { rand } from "../utils/common";
import { DamageType } from "../const/damage-type";

export class TwistedFate extends Card {
	public name = '뒤틀린 운명';
	public type = CardTypes.Attack;
	public priority: number = Priority.Low;

	trigger(opponent: Player): void {
		const tossResult = [
			this.coinToss(),
			this.coinToss(),
			this.coinToss(),
		];

		const frontCoin = tossResult.filter(c => c === 0);
		this.player.history.log(`코인 토스 결과: ${tossResult.map(c => c === 0 ? '[앞]' : '[뒤]').join(', ')}`)
		if ( frontCoin.length === 0 ) {
			const damage = this.player.hitDamage(1000, DamageType.Fixed);
			this.player.hitted(damage, damage, DamageType.Fixed);
			this.player.history.log(`뒤집어진 운명으로 인해 [${this.player.name}] 님이 [${damage}]의 데미지를 입었습니다.`);
		} else {
			const res = frontCoin.map(c => this.player.attack(opponent, 300));
			this.player.history.log(`정해진 운명이 [${opponent.name}] 님에게 총 [${res.length}]회 각각 [${res.join('],[')}] 데미지를 입혔습니다.`);
		}
	}

	// 0: 앞, 1: 뒤
	coinToss() {
		return rand(2);
	}
}