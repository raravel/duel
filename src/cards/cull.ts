import { CullBuff } from "../buffs/cull";
import { BuffCard } from "../interface/card";

export class Cull extends BuffCard {
	public name = '도태';
    public buff = CullBuff;
}