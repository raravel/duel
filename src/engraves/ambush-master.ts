import { Player } from "../interface/player";
import { Engrave } from "../interface/engrave";
import { GameEvents } from "../const/game-event";
import { AmbushMasterBuff } from "src/buffs/ambush-master";


export class AmbushMasterEngrave extends Engrave {
    public name = '기습의 대가';
    
    trigger(opponent: Player): void {
        this.player.history.debug(`[${this.name}:${this.level}] 각인을 플레이어 [${this.player}]에게 등록합니다.`)
        this.player.on(GameEvents.PLAYER_TURN_START, this.onTurnStart.bind(this));
    }

    onTurnStart(): void {
        if ( this.player.turn <= 1 ) {
            const buff = new AmbushMasterBuff(this.player, this.level);
            this.player.buffs.add(buff);
            this.player.history.log(`[${this.player.name}] 님의 [${this.name}:${this.level}] 각인 효과로 인해 [${buff.name}:${this.level}] 버프를 획득했습니다.`);
        }
    }
}