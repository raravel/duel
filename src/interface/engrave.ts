import { randomUUID } from "crypto";
import { Player } from "./player";


export abstract class Engrave {
	public name: string = '';
	public level: number = 1;
	public uuid = randomUUID();

	constructor(
		protected player: Player
	) {

	}

	abstract trigger(opponent: Player): void;
}