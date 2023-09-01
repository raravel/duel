import { GameEvents } from "src/const/game-event";
import { Buff } from "../interface/buff";
import { Player } from "../interface/player";

export class MeyhemBuff extends Buff {
	public name = "광기";
	public keepCount: number = 3;

	constructor(protected player: Player) {
		super(player);
		this.onTurnStart = this.onTurnStart.bind(this);
	}

	initialize(): void {
		this.player.on(GameEvents.PLAYER_TURN_START, this.onTurnStart);
	}

	onTurnStart() {
		const cards = [
			this.player.draw(),
			this.player.draw(),
			this.player.draw(),
		];
		this.player.history.log(`${this.name}의 효과로 ${cards.map(c => c.name).join(',')} 카드를 추가 드로우 하였습니다.`);
	}

	deinitialize(): void {
		this.player.buffs.delete(this);
		this.player.delete(GameEvents.PLAYER_TURN_START, this.onTurnStart);
	}
}