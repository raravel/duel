import { BuffCalcType, BuffType } from "../const/buff-type";
import { Buff, EnhancedDamageBuff } from "../interface/buff";
import { Player } from "../interface/player";
import { GameEvents } from "../const/game-event";


export class AwakeBuff extends EnhancedDamageBuff {
    public name = "각성";
    public calcType: BuffCalcType = BuffCalcType.Percentage;
    public calcValue: number = 0; // constructor 에서 초기화
    public keepCount: number = -1;
    public isPurificationPossible: boolean = false;

    constructor(
        protected player: Player,
        protected level: number
    ) {
        super(player);
        this.onTurnStart = this.onTurnStart.bind(this);
        this.deinitialize = this.deinitialize.bind(this);

        switch ( this.level ) {
            case 1:
                this.calcValue = 7;
                break;
            case 2:
                this.calcValue = 15;
                break;
            case 3:
                this.calcValue = 21;
                break;
        }
    }

    initialize(): void {
		this.player.history.debug(`[${this.name}] 버프가 [${this.player.name}] 플레이어에게 초기화 됐습니다. 이벤트: [${GameEvents.PLAYER_TURN_END}]`);
		this.player.on(GameEvents.PLAYER_TURN_START, this.onTurnStart);
	}

	onTurnStart() {
        const newCard = this.player.draw()
		this.player.history.log(`[${this.name}] 버프의 효과로 [${newCard.name}] 카드를 추가 드로우 하였습니다.`);
	}

	deinitialize(): void {
		this.player.delete(GameEvents.PLAYER_TURN_START, this.onTurnStart);
		this.player.buffs.delete(this);
		this.player.history.detail(`[${this.player.name}] 님의 [${this.name}] 버프가 사라졌습니다.`);
	}
}