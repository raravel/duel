import { EnhancedArmorBuff, EnhancedDamageBuff } from "../interface/buff";
import { Player } from "../interface/player";
import { BuffCalcType } from "../const/buff-type";
import { GameEvents } from "../const/game-event";

export class DropOfEtherDamageBuff extends EnhancedDamageBuff {
	public name = "구슬 동자:힘의 구슬";
	public calcType: BuffCalcType = BuffCalcType.Percentage;
	public calcValue: number = 0;
	public keepCount: number = -1;
    public isPurificationPossible: boolean = false;

	constructor(protected player: Player, private level: number) {
		super(player);
        switch ( level ) {
            case 1:
                this.calcValue = 10;
                break;
            case 2:
                this.calcValue = 15;
                break;
            case 3:
                this.calcValue = 20;
                break;
        }
        this.onTurnEnd = this.onTurnEnd.bind(this);
	}

	initialize(): void {
		this.player.history.debug(`[${this.name}:${this.level}] 버프가 [${this.player.name}] 플레이어에게 초기화 됐습니다.`);
        this.player.on(GameEvents.PLAYER_TURN_END, this.onTurnEnd);
    }

    onTurnEnd() {
        this.deinitialize();
    }

	deinitialize(): void {
        this.player.on(GameEvents.PLAYER_TURN_END, this.onTurnEnd);
        this.player.history.detail(`[${this.name}:${this.level}] 버프가 [${this.player.name}] 플레이어에게서 사라졌습니다.`);
	}
}

export class DropOfEtherArmorBuff extends EnhancedArmorBuff {
	public name = "구슬 동자:방어의 구슬";
	public calcType: BuffCalcType = BuffCalcType.Percentage;
	public calcValue: number = 0;
	public keepCount: number = -1;
    public isPurificationPossible: boolean = false;

	constructor(protected player: Player, private level: number) {
		super(player);
        switch ( level ) {
            case 1:
                this.calcValue = 10;
                break;
            case 2:
                this.calcValue = 15;
                break;
            case 3:
                this.calcValue = 20;
                break;
        }
        this.onTurnEnd = this.onTurnEnd.bind(this);
	}

	initialize(): void {
		this.player.history.debug(`[${this.name}:${this.level}] 버프가 [${this.player.name}] 플레이어에게 초기화 됐습니다.`);
        this.player.on(GameEvents.PLAYER_TURN_END, this.onTurnEnd);
    }

    onTurnEnd() {
        this.deinitialize();
    }

	deinitialize(): void {
        this.player.on(GameEvents.PLAYER_TURN_END, this.onTurnEnd);
        this.player.history.detail(`[${this.name}:${this.level}] 버프가 [${this.player.name}] 플레이어에게서 사라졌습니다.`);
	}
}