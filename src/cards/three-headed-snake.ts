import { CardTypes } from "../const/card-type";
import { Card } from "../interface/card";
import { Priority } from "../const/priority";
import { Player } from "../interface/player";
import { DamageType } from "../const/damage-type";

export class ThreeHeadedSnake extends Card {
	public name = '삼두사';
	public type = CardTypes.Attack;
	public priority: number = Priority.Low;
	public damage: number = 200;

	trigger(opponent: Player): void {
		const attacked: number[] = [];
		attacked.push(this.player.attack(opponent, this.damage, DamageType.Normal));
		attacked.push(this.player.attack(opponent, this.damage, DamageType.Normal));
		attacked.push(this.player.attack(opponent, this.damage, DamageType.Normal));

		this.player.history.log(`[${opponent.name}] 님에게 [${attacked.join('],[')}] 데미지를 입혔습니다.`);
	}
}