import { Player } from "../interface/player";
import { Engrave } from "../interface/engrave";
import { GameEvents } from "../const/game-event";
import { DamageType } from "../const/damage-type";
import { calcPer } from "../utils/common";


export class VitalPointHitEngrave extends Engrave {
    public name = '급소 타격';
    private percentage = 0;
    
    trigger(opponent: Player): void {
        this.player.history.debug(`[${this.name}:${this.level}] 각인을 플레이어 [${this.player}]에게 등록합니다.`)
        opponent.on(GameEvents.HITTED, this.onOpponentHitted.bind(this));

        switch ( this.level ) {
            case 1:
                this.percentage = 30;
                break;
            case 2:
                this.percentage = 40;
                break;
            case 3:
                this.percentage = 50;
                break;
        }
    }

    onOpponentHitted(damage: number, originalDamage: number, originalDamageType: DamageType): void {
        const plusDamage = calcPer(this.percentage, damage);
        this.player.attack(this.player.opponent, plusDamage, DamageType.Fixed);
        this.player.history.log(`[${this.player.name}] 님의 [${this.name}:${this.level}] 각인 효과로 인해 [${plusDamage}] 의 추가데미지를 입힙니다.`);
    }
}