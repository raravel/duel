import { BuffType } from "../const/buff-type";
import { Buff } from "../interface/buff";
import { Player } from "../interface/player";
import { GameEvents } from "../const/game-event";


export class MoonBuff extends Buff {
    public name = "달";
    public keepCount: number = 4;
    public type: BuffType = BuffType.Normal;

    constructor(protected player: Player) {
        super(player);
    }

    initialize(): void {
		this.player.on(GameEvents.PLAYER_TURN_START, this.onTurnStart);
	}

	onTurnStart() {
        this.player.history.log(`달빛을 받은 [${this.player.name}] 님은 500 라이프를 회복했습니다.`);
        this.player.heal(500);
        this.keepCount--;
        if ( this.keepCount <= 0 ) {
		    this.deinitialize();
        }
        this.player.history.detail(`[${this.player.name}] 님의 [${this.name}] 버프 유지시간 [${this.keepCount}] 회`);
	}

	deinitialize(): void {
		this.player.delete(GameEvents.PLAYER_TURN_START, this.onTurnStart);
		this.player.buffs.delete(this);
		this.player.history.detail(`[${this.player.name}] 님의 [${this.name}] 버프가 사라졌습니다.`);
	}
}