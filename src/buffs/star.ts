import { GameEvents } from "../const/game-event";
import { EnhancedArmorBuff } from "../interface/buff";
import { Player } from "../interface/player";
import { BuffCalcType } from "../const/buff-type";

export class StarBuff extends EnhancedArmorBuff {
	public name = "별";
	public calcType: BuffCalcType = BuffCalcType.Percentage;
	public calcValue: number = 30;
	public keepCount: number = -1;

	constructor(protected player: Player) {
		super(player);
		this.process = this.process.bind(this);
	}

	initialize(): void {
		this.player.history.debug(`[${this.name}] 버프가 [${this.player.name}] 플레이어에게 초기화 됐습니다. 이벤트: [${GameEvents.PLAYER_TURN_START}]`);
		this.player.on(GameEvents.PLAYER_TURN_START, this.process);
	}

	process() {
		// 해당 이벤트가 발생한 것은 이미 계산이 된 이후이므로 버프 해제만 한다.
		this.deinitialize();
	}

	deinitialize(): void {
		this.player.buffs.delete(this);
		this.player.delete(GameEvents.PLAYER_TURN_START, this.process);
		this.player.history.detail(`[${this.player.name}] 님의 [${this.name}] 버프가 사라졌습니다.`);
	}
}