import { GameEvents } from "../const/game-event";
import { Buff, ReducesArmorBuff } from "../interface/buff";
import { Player } from "../interface/player";
import { BuffCalcType, BuffType } from "../const/buff-type";

export class CorrosionBuff extends ReducesArmorBuff {
	public name = "부패";
	public keepCount: number = 1;
	public calcValue: number = 20;
	public calcType: BuffCalcType = BuffCalcType.Percentage;

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
	public type = BuffType.Normal;
	public keepCount: number = 0;

	constructor(protected player: Player) {
		super(player);
		this.onTurnStart = this.onTurnStart.bind(this);
	}

	initialize(): void {
		this.player.history.debug(`[${this.name}] 버프가 [${this.player.name}] 플레이어게 초기화되었습니다. 이벤트: ${GameEvents.PLAYER_TURN_START}`);
		this.player.on(GameEvents.PLAYER_TURN_START, this.onTurnStart);
	}

	onTurnStart() {
		const card = this.player.draw();
		this.player.history.log(`[${this.name}] 버프 효과로 [${card.name}] 카드를 추가 드로우 했습니다.`);
		const buff = new CorrosionBuff(this.player);
		this.player.buffs.add(buff);
		this.player.history.log(`[${this.name}]버프 효과로 [${buff.name}] 디버프가 부여됐습니다.`);
	}

	deinitialize(): void {
		this.player.buffs.delete(this);
		this.player.delete(GameEvents.PLAYER_TURN_START, this.onTurnStart);
	}
}