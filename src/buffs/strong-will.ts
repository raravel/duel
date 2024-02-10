import { GameEvents } from "../const/game-event";
import { EnhancedArmorBuff } from "../interface/buff";
import { Player } from "../interface/player";
import { BuffCalcType, BuffType } from "../const/buff-type";

export class StrongWillBuff extends EnhancedArmorBuff {
	public name = "굳은 의지";
	public calcType: BuffCalcType = BuffCalcType.Percentage;
	public calcValue: number = 0;
	public keepCount: number = -1;
    public isPurificationPossible: boolean = false;

	constructor(protected player: Player, private level: number) {
		super(player);
		this.onTurnStart = this.onTurnStart.bind(this);
        switch ( this.level ) { 
            case 1:
                this.calcValue = 30;
                break;
            case 2:
                this.calcValue = 40;
                break;
            case 3:
                this.calcValue = 50;
                break;
        }
	}

	initialize(): void {
		this.player.history.debug(`[${this.name}:${this.level}] 버프가 [${this.player.name}] 플레이어에게 초기화 됐습니다. 이벤트: [${GameEvents.PLAYER_TURN_START}]`);
		this.player.on(GameEvents.PLAYER_TURN_START, this.onTurnStart);
	}

	onTurnStart() {
		// 해당 이벤트가 발생한 것은 이미 계산이 된 이후이므로 버프 해제만 한다.
		this.deinitialize();
	}

	deinitialize(): void {
		this.player.buffs.delete(this);
		this.player.delete(GameEvents.PLAYER_TURN_START, this.onTurnStart);
		this.player.history.detail(`[${this.player.name}] 님의 [${this.name}:${this.level}] 버프가 사라졌습니다.`);
	}
}