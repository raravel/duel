import { Player } from "../interface/player";
import { Engrave } from "../interface/engrave";
import { GameEvents } from "../const/game-event";
import { calcPer, randomPick } from "src/utils/common";


export class EmergencyRescueEngrave extends Engrave {
    public name = '긴급 구조';
    public percentage = 0;

    trigger(opponent: Player): void {
        this.player.history.debug(`[${this.name}:${this.level}] 각인을 플레이어 [${this.player}]에게 등록합니다.`);
        this.player.on(GameEvents.HITTED, this.onHitted.bind(this));
        switch ( this.level ) {
            case 1:
                this.percentage = 10;
                break;
            case 2:
                this.percentage = 20;
                break;
            case 3:
                this.percentage = 30;
                break;
        }
    }

    onHitted(damage: number): void {
        const canActive = randomPick([
            [this.percentage, true],
            [100 - this.percentage, false],
        ]);
        if ( canActive ) {
            this.player.heal(damage);
            this.player.history.log(`[${this.name}:${this.level}] 각인 효과로 인하여 [${this.player}]의 HP를 ${damage}만큼 회복했습니다.`);
        }
    }
}