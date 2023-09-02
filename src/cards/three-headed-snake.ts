import { CardTypes } from "../const/card-type";
import { Card } from "../interface/card";
import { Priority } from "../const/priority";
import { Player } from "../interface/player";

export class ThreeHeadedSnake extends Card {
	public name = '삼두사';
	public type = CardTypes.Attack;
	public priority: number = Priority.Low;
	public damage: number = 200;

	trigger(opponent: Player): void {
		const realDamage = this.player.calcDamage(this.damage);
		const attacked: number[] = [];
		attacked.push(opponent.hitDamage(realDamage));
		attacked.push(opponent.hitDamage(realDamage));
		attacked.push(opponent.hitDamage(realDamage));

		console.log(this.player.history.uuid, this.player.history, attacked);

		this.player.history.log(`${opponent.name}에게 ${attacked.join(',')}데미지를 입혔습니다.`);
	}
}