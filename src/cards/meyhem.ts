import { BuffCard } from "../interface/card";
import { MeyhemBuff } from "../buffs/meyhem";

export class Meyhem extends BuffCard {
	public name = '광기';
	public buff = MeyhemBuff;
}