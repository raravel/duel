import { CardTypes } from "../const/card-type";
import { Card } from "../interface/card";
import { Priority } from "../const/priority";
import { Player } from "../interface/player";
import { MeyhemBuff } from "../buffs/meyhem";

export class Meyhem extends Card {
	public name = '광기';
	public type = CardTypes.Magic;
	public priority: number = Priority.High;

	trigger(opponent: Player): void {
		const buff = new MeyhemBuff(this.player);
		this.player.buffs.add(buff);
		this.player.history.log(`${this.player.name}은 [${buff.name}] 버프를 획득했습니다.`);
	}
}