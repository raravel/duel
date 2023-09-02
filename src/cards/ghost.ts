import { BuffCard } from "../interface/card";
import { GhostBuff } from "../buffs/ghost";

export class Ghost extends BuffCard {
	public name = '유령';
    public buff = GhostBuff;
}