import { StarBuff } from "../buffs/star";
import { BuffCard } from "../interface/card";

export class Star extends BuffCard {
	public name = '별';
    public buff = StarBuff;
}