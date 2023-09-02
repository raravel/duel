import { randomUUID } from 'crypto';
import { Priority } from '../const/priority';
import { CardTypes } from './../const/card-type';
import { Player } from './player';

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