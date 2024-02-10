import { Player } from "../interface/player";
import { Engrave } from "../interface/engrave";
import { GameEvents } from "../const/game-event";
import { Awake } from "../cards/awake";


export class AwakeEngrave extends Engrave {
    public name = '각성';
    
    trigger(opponent: Player): void {
        this.player.history.debug(`[${this.name}:${this.level}] 각인을 플레이어 [${this.player}]에게 등록합니다.`)
        this.player.on(GameEvents.INITIALIZE, this.onInitialize.bind(this));
    }

    onInitialize(): void {
        this.player.deckAdd(Awake, this.level);
        this.player.history.log(`[${this.player.name}] 님의 [${this.name}:${this.level}] 각인 효과로 인해 [각성:${this.level}] 카드를 추가했습니다.`);
    }
}