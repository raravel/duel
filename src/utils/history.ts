import { randomUUID } from 'crypto';
import debugInstance from 'debug';

const debug = debugInstance('duel:history');

enum HistoryLevel {
	Info = 3,
	Detail = 5,
	Debug = 7,
};

interface HistoryItem {
	level: HistoryLevel;
	message: string;
}

export class HistoryInstance {
	public uuid = randomUUID();
	public history: HistoryItem[] = [];

	push(level: HistoryLevel, message: string) {
		debug(`[${level}] ${message}`);
		this.history.push({
			level,
			message,
		});
	}

	log(message: string) {
		this.push(HistoryLevel.Info, message);
	}

	detail(message: string) {
		this.push(HistoryLevel.Detail, message);
	}

	debug(message: string) {
        this.push(HistoryLevel.Debug, message);
    }
}