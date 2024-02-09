import { Player } from "./player";
import { randomUUID } from 'crypto';
import { GameEvents } from "../const/game-event";
import { BuffCalcType, BuffType } from "../const/buff-type";
import { Priority } from "../const/priority";

export abstract class Buff {
	abstract name: string;
	abstract keepCount: number; // 버프 유지 시간, -1: 무제한. 0: 턴 종료시 끝남., x >= 1 : x 턴동안 유지
	public type = BuffType.Normal;
	protected currentCount: number = 0;
	protected refreshWhenReinit = false;
	public uuid = randomUUID();
	public priority = Priority.Medium;
	public isPurificationPossible = true;

	constructor(protected player: Player) {

	}
	
	abstract initialize(): void; // 버프가 추가될 때
	abstract deinitialize(): void; // 버프가 사라질 때
}

export abstract class ReducesArmorBuff extends Buff {
	public type = BuffType.ReducesArmor; // 방어력 감소 버프
	abstract calcValue: number; // 버프 계산 수치
	abstract calcType: BuffCalcType;
}

export abstract class EnhancedArmorBuff extends Buff {
	public type = BuffType.EnhancedArmor; // 방어력 증가 버프
	abstract calcValue: number; // 버프 계산 수치
	abstract calcType: BuffCalcType;
}

export abstract class ReducesDamageBuff extends Buff {
	public type = BuffType.ReducesDamage;
	abstract calcValue: number;
	abstract calcType: BuffCalcType;
}

export abstract class EnhancedDamageBuff extends Buff {
	public type = BuffType.EnhancedDamage;
	abstract calcValue: number;
	abstract calcType: BuffCalcType;
}

export class PlayerBuff {
	public buffs: Buff[] = [];

	constructor(private player: Player) {
	}

	public add(buff: Buff): void {
		const idx = this.buffs.findIndex((b) => b.name === buff.name);
		this.buffs.push(buff);
		buff.initialize();
	}

	public delete(buff: Buff) {
		const idx = this.buffs.findIndex(b => b.uuid === buff.uuid);
		if ( idx >= 0 ) {
			this.buffs.splice(idx, 1);
		}
	}

	public get(buffType?: BuffType): Buff[] {
		if ( buffType ) {
			return this.buffs.filter(buff => buff.type === buffType);
		}
		return this.buffs;
	}
}