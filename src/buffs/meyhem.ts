import { GameEvents } from "../const/game-event";
import { Buff } from "../interface/buff";
import { Player } from "../interface/player";
import { BuffType } from "../const/buff-type";
import { random } from "../utils/common";

export class MeyhemBuff extends Buff {
	public name = "광기";
	public type = BuffType.Normal;
	public keepCount: number = 3;

	constructor(protected player: Player) {
		super(player);
		this.onTurnStart = this.onTurnStart.bind(this);
	}

	initialize(): void {
		this.player.history.debug(`[${this.name}] 버프가 [${this.player.name}] 플레이어에게 등록됐습니다. 이벤트: [${GameEvents.PLAYER_TURN_START}]`);
		this.player.on(GameEvents.PLAYER_TURN_START, this.onTurnStart);
	}

	onTurnStart() {
		const cards = [
			this.player.draw(),
			this.player.draw(),
			this.player.draw(),
		];
		this.player.history.log(`[${this.name}] 버프의 효과로 ${cards.map(c => c.name).join(',')} 카드를 추가 드로우 하였습니다.`);
		
		const card = random(cards);
		this.player.useCard(card, true);
		this.player.history.log(`광기에 쌓인 [${card.name}] 카드가 가루로 찢겨 묘지로 이동했습니다.`);
				
		if ( this.keepCount >= 0 ) {
			this.keepCount -= 1;
			this.player.history.debug(`[${this.name}] 버프의 남은 카운트: ${this.keepCount}`);
			if ( this.keepCount <= 0 ) {
                this.deinitialize();
			}
		}
	}

	deinitialize(): void {
		this.player.buffs.delete(this);
		this.player.delete(GameEvents.PLAYER_TURN_START, this.onTurnStart);
		this.player.history.detail(`[${this.player.name}] 님의 [${this.name}] 버프가 사라졌습니다.`);
	}
}