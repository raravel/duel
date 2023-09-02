import { GameEvents } from "../const/game-event";
import { Buff, EnhancedDamageBuff } from "../interface/buff";
import { Player } from "../interface/player";
import { BuffCalcType, BuffType } from "../const/buff-type";
import { CardTypes } from "../const/card-type";

export class CullDrainedBuff extends Buff {
	public name = "도태:탈진";
	public keepCount: number = 2;

	constructor(protected player: Player) {
		super(player);
		this.process = this.process.bind(this);
	}

	initialize(): void {
		this.player.history.debug(`[${this.name}] 버프가 [${this.player.name}] 플레이어에게 초기화 됐습니다. 이벤트: [${GameEvents.PLAYER_TURN_START}]`);
		this.player.on(GameEvents.PLAYER_TURN_START, this.process);
	}

	process() {
		this.keepCount--;
		if ( this.keepCount <= 0 ) {
			this.deinitialize();
			return;
		}

		const throwCards = this.player.hand.filter((card) => card.type === CardTypes.Attack);
		throwCards.forEach((card) => this.player.useCard(card, true));
		this.player.history.log(`힘이 빠져버린 [${this.player.name}] 님은 [${throwCards.map((card) => card.name).join('],[')}] 카드를 놓치고 그만 묘지로 보내버렸습니다.`);
	}

	deinitialize(): void {
		this.player.buffs.delete(this);
		this.player.delete(GameEvents.PLAYER_TURN_START, this.process);
		this.player.history.detail(`[${this.player.name}] 님의 [${this.name}] 버프가 사라졌습니다.`);		
	}
}

export class CullBuff extends EnhancedDamageBuff {
	public name = "도태";
	public calcType: BuffCalcType = BuffCalcType.Percentage;
	public calcValue: number = 300;
	public keepCount: number = -1;

	constructor(protected player: Player) {
		super(player);
		this.process = this.process.bind(this);
	}

	initialize(): void {
		this.player.history.debug(`[${this.name}] 버프가 [${this.player.name}] 플레이어에게 초기화 됐습니다. 이벤트: [${GameEvents.PLAYER_TURN_END}]`);
		this.player.on(GameEvents.PLAYER_TURN_END, this.process);
	}

	process() {
		// 해당 이벤트가 발생한 것은 이미 계산이 된 이후이므로 버프 해제만 한다.
		this.deinitialize();

		// 패널티에 따라 새로운 버프를 다음 턴 시작시에 부여한다.
		const buff = new CullDrainedBuff(this.player);
		this.player.buffs.add(buff);
		this.player.history.log(`[${this.player.name}] 님에게 [${buff.name}] 버프가 부여되었습니다.`);
	}

	deinitialize(): void {
		this.player.buffs.delete(this);
		this.player.delete(GameEvents.PLAYER_TURN_END, this.process);
		this.player.history.detail(`[${this.player.name}] 님의 [${this.name}] 버프가 사라졌습니다.`);
	}
}