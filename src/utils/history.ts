
export class HistoryInstance {
	private history: string[] = [];

	log(message: string) {
		this.history.push(message);
	}
}