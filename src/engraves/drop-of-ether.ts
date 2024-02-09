import { Player } from "../interface/player";
import { Engrave } from "../interface/engrave";
import { GameEvents } from "../const/game-event";
import { randomPick } from "../utils/common";
import { DropOfEtherArmorBuff, DropOfEtherDamageBuff } from "src/buffs/drop-of-ether";


export class DropOfEtherEngrave extends Engrave {
    public name = '각성';
    
    trigger(opponent: Player): void {
        this.player.history.debug(`[${this.name}:${this.level}] 각인을 플레이어 [${this.player}]에게 등록합니다.`)
        this.player.on(GameEvents.PLAYER_TURN_START, this.onTurnStart.bind(this));
    }

    onTurnStart(): void {
        const work = randomPick([
            [20, 'damage'],
            [20, 'armor'],
            [20, 'draw'],
            [40, 'none'],
        ]);
        switch ( work ) {
            case 'damage': {
                const buff = new DropOfEtherDamageBuff(this.player, this.level);
                this.player.buffs.add(buff);
                this.player.history.log(`[${this.player.name}] 님의 [${this.name}:${this.level}] 각인 효과로 인해 [${buff.name}:${this.level}] 버프를 획득합니다.`);
            } break;
            case 'armor': {
                const buff = new DropOfEtherArmorBuff(this.player, this.level);
                this.player.buffs.add(buff);
                this.player.history.log(`[${this.player.name}] 님의 [${this.name}:${this.level}] 각인 효과로 인해 [${buff.name}:${this.level}] 버프를 획득합니다.`);
            } break;
            case 'draw': {
                const card = this.player.draw();
                this.player.history.log(`[${this.player.name}] 님의 [${this.name}:${this.level}] 각인 효과로 인해 [${card.name}] 카드를 한장 드로우합니다.`);
            } break;
            case 'none': {
                this.player.history.log(`[${this.player.name}] 님의 [${this.name}:${this.level}] 각인 효과로 인해 아무일도 일어나지 않았습니다.`);
            } break;
        }
    }
}