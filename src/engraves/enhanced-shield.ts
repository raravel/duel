import { Player } from "../interface/player";
import { Engrave } from "../interface/engrave";
import { GameEvents } from "../const/game-event";
import { EnhancedShieldBuff } from "src/buffs/enhanced-shield";

export class EnhancedShieldEngrave extends Engrave {
    public name = '강화 방패';
    
    constructor(player: Player, level: number) {
        super(player);
        this.level = level;
        
    }
    
    trigger(opponent: Player): void {
        this.player.history.debug(`[${this.name}:${this.level}] 각인을 플레이어 [${this.player}]에게 등록합니다.`)
        this.player.on(GameEvents.PLAYER_TURN_START, this.onInitialize.bind(this));
    }

    onInitialize(): void {
        const buff = new EnhancedShieldBuff(this.player, this.level);
        this.player.buffs.add(buff);
    }
}