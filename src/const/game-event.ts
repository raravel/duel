

export enum GameEvents {
	INITIALIZE = 'ge:initialize',
	PLAYER_DRAW = 'ge:player:draw',
	OPPONENT_DRAW = 'ge:opponent:draw',
	HITTED = 'ge:hitted',
	ATTACK = 'ge:attack',
	HEAL = 'ge:heal',
	PLAYER_TURN_START = 'ge:player:turn_start',
	OPPONENT_TURN_START = 'ge:opponent:turn_start',
	PLAYER_TURN_END = 'ge:player:turn_end',
	OPPONENT_TURN_END = 'ge:opponent:turn_end',
}