import { MoonBuff } from "../buffs/moon";
import { BuffCard } from "../interface/card";

export class Moon extends BuffCard {
	public name = '달';
    public buff = MoonBuff;
}