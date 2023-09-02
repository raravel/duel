import { CardTypes } from "../const/card-type";
import { Card } from "../interface/card";
import { Priority } from "../const/priority";
import { Player } from "../interface/player";
import { randomPick } from "../utils/common";
import { CorrosionDrawBuff } from "../buffs/corrosion";

enum CorrosionItem {
	Draw = 'draw',
	DeBuff = 'debuff',
}

export class Corrosion extends Card {
	public name = '부식';
	public type = CardTypes.Magic;
	public priority: number = Priority.High;

	trigger(opponent: Player): void {
		const item = randomPick([
			[60, CorrosionItem.Draw],
			[40, CorrosionItem.DeBuff],
		]);
		switch ( item ) {
			case CorrosionItem.Draw:
				this.player.history.log(`60%의 확률로 카드를 한 장 더 드로우합니다.`);
				const card = this.player.draw();
				this.player.history.log(`[${card.name}] 카드를 드로우 했습니다.`);
				break;
			case CorrosionItem.DeBuff:
				const buff = new CorrosionDrawBuff(opponent);
				opponent.buffs.add(buff);
				opponent.history.log(`40%의 확률! [${opponent.name}] 님에게 [${buff.name}] 버프를 부여했습니다.`);
				break;
		}
	}
}