export enum BuffType {
	Normal = 'normal',
	ReducesArmor = 'reduces_armor',
	EnhancedArmor = 'enhanced_armor',
}

export enum BuffCalcType {
	Fixed = 'fixed', // 고정 수치 증가
	Percentage = 'percentage', // 수치 * x% 가 증가
}