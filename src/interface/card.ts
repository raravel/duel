import { randomUUID } from 'crypto';
import { Priority } from '../const/priority';
import { CardTypes } from './../const/card-type';
import { Player } from './player';
import { Buff } from './buff';
import { Class } from './constructable';
import { TargetType } from '../const/target-type';

export abstract class Card {
	abstract name: string;
	abstract type: CardTypes;
	abstract priority: Priority;
	protected player: Player;
	public uuid = randomUUID();

	constructor(player: Player) {
		this.player = player;
	}

	abstract trigger(opponent: Player): void;
}


export abstract class BuffCard extends Card {
	public type = CardTypes.Magic;
	public priority: number = Priority.High;
	abstract buff: Class<Buff>;
	protected target: TargetType = TargetType.Player;

	trigger(opponent: Player): void {
		if ( this.target === TargetType.Player ) {
			const buff = new this.buff(this.player);
			this.player.buffs.add(buff);
			this.player.history.log(`[${this.player.name}] 님은 [${buff.name}] 버프를 획득했습니다.`);
		} else if ( this.target === TargetType.Opponent ) {
			const buff = new this.buff(opponent);
			opponent.buffs.add(buff);
			opponent.history.log(`[${opponent.name}] 님에게 [${buff.name}] 버프가 부여되었습니다.`);
		}
	}
}