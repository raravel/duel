import { EnhancedArmorBuff } from "../interface/buff";
import { Player } from "../interface/player";
import { BuffCalcType } from "../const/buff-type";

export class EnhancedShieldBuff extends EnhancedArmorBuff {
	public name = "강화 방패";
	public calcType: BuffCalcType = BuffCalcType.Percentage;
	public calcValue: number = 0;
	public keepCount: number = -1;
    public isPurificationPossible: boolean = false;

	constructor(protected player: Player, private level: number) {
		super(player);
        switch ( level ) {
            case 1:
                this.calcValue = 20;
                break;
            case 2:
                this.calcValue = 30;
                break;
            case 3:
                this.calcValue = 40;
                break;
        }
	}

	initialize(): void {
		this.player.history.debug(`[${this.name}:${this.level}] 버프가 [${this.player.name}] 플레이어에게 초기화 됐습니다.`);
	}
	deinitialize(): void {
	}
}