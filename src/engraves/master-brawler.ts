import { Player } from "../interface/player";
import { Engrave } from "../interface/engrave";
import { GameEvents } from "../const/game-event";
import { random, randomPick } from "src/utils/common";
import { DamageType } from "src/const/damage-type";


export class MasterBrawlerEngrave extends Engrave {
    public name = '결투의 대가';
    private damage = 0;

    constructor(player: Player, level: number) {
        super(player);
        this.level = level;
        switch ( this.level ) {
            case 1:
                this.damage = 500;
                break;
            case 2:
                this.damage = 750;
                break;
            case 3:
                this.damage = 1000;
                break;
        }

        this.onAttack = this.onAttack.bind(this);
    }
    
    trigger(opponent: Player): void {
        this.player.history.debug(`[${this.name}:${this.level}] 각인을 플레이어 [${this.player}]에게 등록합니다.`)
        this.player.on(GameEvents.ATTACK, this.onAttack);
    }

    onAttack(realDamage: number, damage: number, damageType: DamageType): void {
        if ( damageType === DamageType.Fixed ) {
            this.player.attack(this.player.opponent, this.damage);
            this.player.history.log(`[${this.player.name}] 님의 [${this.name}:${this.level}] 각인 효과로 인해 [${this.damage}]의 데미지를 추가로 입힙니다.`);
        }
    }
}