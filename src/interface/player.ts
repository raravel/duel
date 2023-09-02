import { HistoryInstance } from "../utils/history";
import { EventBinder } from "../utils/event-binder";
import { PlayerBuff } from "./buff";
import { DamageType } from "../const/damage-type";
import { GameEvents } from "../const/game-event";
import { Card } from "./card";
import { Reaper } from "../cards/reaper";
import { Class } from "./constructable";


export class Player extends EventBinder {
	public name: string = '';
	public hash: string = '';
	public opponent!: Player;

	public defaultHp = 3000;
	public hp: number = this.defaultHp;
	public defaultAttack: number = 500;
	public history!: HistoryInstance;

	public buffs: PlayerBuff = new PlayerBuff(this); // 버프
	public debuffs: any[] = []; // 디버프
	public forceBuffs: any[] = []; // 정화 불가능한 버프

	public deck: Card[] = []; // 플레이어 설정 카드 리스트
	public cardList: Card[] = []; // 인게임 덱 카드 리스트
	public usedCardList: Card[] = []; // 묘지 카드 리스트

	public engraves: any[] = []; // 각인 리스트

	private _hand: Card[] = []; // 손 패

	public get hand(): Card[] {
		return this._hand
			.sort((a, b) => a.priority === b.priority ? 0 : a.priority > b.priority ? 1 : -1);
	}

	public set hand(value: Card[]) {
		this._hand = value;
	}

	public get isDead(): boolean {
		return this.hp <= 0;
	}

	public deckAdd(CardConstructor: Class<Card>): void {
		const card = new CardConstructor(this);
		this.deck.push(card);
	}

	public useCard(card: Card, notUse: boolean = false): void {
		if ( !notUse ) {
			this.history.log(`[${card.name}]카드 사용.`);
			card.trigger(this.opponent);
		}
		this.usedCardList.push(card);
	}

	// 플레이어가 피격시 방어력 감소 버프 등으로 계산되는 데미지
	public hitDamage(damage: number, damageType: DamageType = DamageType.Normal) {
		if ( damageType === DamageType.Normal ) {

		}
		return damage;
	}

	// 플레이어가 공격시 공격력 증가 버프 등으로 계산되는 데미지
	public calcDamage(damage: number, damageType: DamageType = DamageType.Normal) {
		if ( damageType === DamageType.Normal ) {

		}
		return damage;
	}

	public attack(target: Player, damage: number, damageType: DamageType = DamageType.Normal) {
		const playerDamage = this.calcDamage(damage, damageType);
		const realDamage = target.hitDamage(playerDamage);
		this.emit(GameEvents.ATTACK, realDamage);
		target.emit(GameEvents.HITTED, realDamage);
		target.hitted(realDamage);
		return realDamage;
	}

	public hitted(damage: number) {
		this.hp -= damage;
	}

	// 카드 뽑기
	public draw() {
		if ( this.cardList.length > 0 ) {
			const card = this.cardList.shift() as Card;
			this.hand.push(card);
			return card;
		} else {
			const card = new Reaper(this);
			this.hand.push(card);
			return card;
		}
	}
}