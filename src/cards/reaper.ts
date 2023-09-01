import { CardTypes } from "../const/card-type";
import { Card } from "../interface/card";
import { Priority } from "../const/priority";
import { Player } from "../interface/player";
import { MeyhemBuff } from "../buffs/meyhem";
import { DamageType } from "../const/damage-type";

const reaperMemory: Record<string, number> = {};

export class Reaper extends Card {
	public name = '저승사자';
	public type = CardTypes.Reaper;
	public priority: number = Priority.VeryHigh;

	trigger(opponent: Player): void {
		const damage = this.player.hitDamage(this.getData(), DamageType.Reaper);
		this.player.hitted(damage);
		reaperMemory[this.player.hash] += 50;

		this.player.history.log(`${this.player.name}은 저승사자의 부름으로 인해 ${damage}의 데미지를 입었습니다.`);
	}

	getData() {
		const key = this.player.hash;
		if ( reaperMemory[key] === undefined ) {
			reaperMemory[key] = 100;
		}
		return reaperMemory[key];
	}
}