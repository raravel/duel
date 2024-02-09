import { Player } from "../interface/player";
import { BuffCard, Card } from "../interface/card";
import { GameEvents } from "../const/game-event";
import { Buff } from "../interface/buff";
import { Class } from "../interface/constructable";
import { AwakeBuff } from "../buffs/awake";

export class Awake extends BuffCard {
    public name: string = '각성';
    public buff: Class<Buff> = AwakeBuff;

    constructor(
        player: Player,
        public level: number
    ) {
        super(player);
        this.args = [ level ];
    }

}