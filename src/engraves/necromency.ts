import { Player } from "../interface/player";
import { Engrave } from "../interface/engrave";
import { GameEvents } from "../const/game-event";
import { random, randomPick } from "src/utils/common";


export class NecromencyEngrave extends Engrave {
    public name = '강령술';
    private percentage = 0;

    constructor(player: Player, level: number) {
        super(player);
        this.level = level;
        switch ( this.level ) {
            case 1:
                this.percentage = 15;
                break;
            case 2:
                this.percentage = 25;
                break;
            case 3:
                this.percentage = 35;
                break;
        }
    }
    
    trigger(opponent: Player): void {
        this.player.history.debug(`[${this.name}:${this.level}] 각인을 플레이어 [${this.player}]에게 등록합니다.`)
        this.player.on(GameEvents.PLAYER_TURN_START, this.onInitialize.bind(this));
    }

    onInitialize(): void {
        const canActive = randomPick([
            [this.percentage, true],
            [100 - this.percentage, false],
        ]);

        if ( canActive ) {
            const usedCard = random(this.player.usedCardList);
            this.player.useCard(usedCard);
            this.player.history.log(`[${this.player.name}] 님의 [${this.name}:${this.level}] 각인 효과로 인해 [${usedCard.name}] 카드를 사용합니다.`);
        }
    }
}