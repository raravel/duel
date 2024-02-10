import { Player } from "../interface/player";
import { Engrave } from "../interface/engrave";
import { GameEvents } from "../const/game-event";
import { StrongWillBuff } from "src/buffs/strong-will";


export class StrongWillEngrave extends Engrave {
    public name = '굳은 의지';
    private heal = 0;
    
    trigger(opponent: Player): void {
        this.player.history.debug(`[${this.name}:${this.level}] 각인을 플레이어 [${this.player}]에게 등록합니다.`)
        this.player.on(GameEvents.HITTED, this.onHitted.bind(this));
        switch ( this.level ) {
            case 1:
                this.heal = 1000;
                break;
            case 2:
                this.heal = 1500;
                break;
            case 3:
                this.heal = 2000;
                break;
        }
    }

    onHitted(): void {
        if ( this.player.isDead ) {
            this.player.heal(this.heal);
            this.player.history.log(`[${this.player.name}] 님의 [${this.name}:${this.level}] 각인 효과로 인해 [${this.heal}] HP를 회복했습니다.`);
            
            const buff = new StrongWillBuff(this.player, this.level);
            this.player.buffs.add(buff);
            this.player.history.log(`[${this.player.name}] 님의 [${this.name}:${this.level}] 각인 효과로 인해 [${buff.name}] 버프를 획득했습니다.`);
        }
    }
}