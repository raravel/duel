import { GameEvents } from "src/const/game-event";
import { Buff } from "../interface/buff";
import { Player } from "../interface/player";

export class CorrosionBuff extends Buff {
	public name = "부패";
	public keepCount: number = 1;

	constructor(protected player: Player) {
		super(player);
		this.onTurnStart = this.onTurnStart.bind(this);
	}

	initialize(): void {
		this.player.on(GameEvents.PLAYER_TURN_START, this.onTurnStart);
	}

	onTurnStart() {
		this.deinitialize();
	}

	deinitialize(): void {
		this.player.delete(GameEvents.PLAYER_TURN_START, this.onTurnStart);
		this.player.buffs.delete(this);
	}
	
}

export class CorrosionDrawBuff extends Buff {
	public name = "부식:드로우";
	public keepCount: number = 0;

	constructor(protected player: Player) {
		super(player);
		this.onTurnStart = this.onTurnStart.bind(this);
	}

	initialize(): void {
		this.player.on(GameEvents.PLAYER_TURN_START, this.onTurnStart);
	}

	onTurnStart() {
		const card = this.player.draw();
		this.player.history.log(`${this.name}버프 효과로 ${card.name}을 추가 드로우 했습니다.`);
	}

	deinitialize(): void {
		this.player.buffs.delete(this);
		this.player.delete(GameEvents.PLAYER_TURN_START, this.onTurnStart);
	}
}