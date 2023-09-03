import { CardTypes } from "../const/card-type";
import { Card } from "../interface/card";
import { Priority } from "../const/priority";
import { Player } from "../interface/player";

export class Royal extends Card {
	public name = '로열';
	public type = CardTypes.Magic;
	public priority: number = Priority.High;

	trigger(opponent: Player): void {
		const cards: Card[] = [
            this.player.draw(),
            this.player.draw(),
            this.player.draw(),
        ];
		this.player.history.log(`[${this.name}] 카드의 효과로 ${cards.map(c => c.name).join(',')} 카드를 드로우 하였습니다.`);
	}
}