
export interface EventItem {
	type: 'on' | 'once';
	callback: EventCallback;
}

export type EventCallback = (...args: any[]) => any;

export class EventBinder {
	private eventListners: Record<string, EventItem[]> = {};

	public addEventListener(event: string, callback: EventCallback, type: EventItem["type"] = 'on') {
		if ( !Array.isArray(this.eventListners[event]) ) {
			this.eventListners[event] = [];
		}
		this.eventListners[event].push({
			type,
			callback,
		}); 
	}

	public on(event: string, callback: EventCallback) {
		this.addEventListener(event, callback, 'on');
	}

	public once(event: string, callback: EventCallback) {
		this.addEventListener(event, callback, 'once');
	}

	public removeEventListener(event: string, callback: EventCallback) {
		if ( Array.isArray(this.eventListners[event]) ) {
			const idx = this.eventListners[event].findIndex((cb) => cb.callback === callback);
			if ( idx >= 0 ) {
				this.eventListners[event].splice(idx, 1);
			}
		}
	}

	public delete(event: string, callback: EventCallback) {
		return this.removeEventListener(event, callback);
	}

	public dispatchEvent(event: string, ...args: any[]): any|null {
		if ( !Array.isArray(this.eventListners[event]) ) {
			return null;
		}
		const removeItems: EventItem[] = [];
		for ( let i=0;i < this.eventListners[event].length;i++ ) {
			const item = this.eventListners[event][i];
			item.callback(...args);
			if ( item.type === 'once' ) {
				removeItems.push(item);
			}
		}

		removeItems.forEach((item) => {
			this.removeEventListener(event, item.callback);
		});
	}

	public emit(event: string, ...args: any[]) {
		return this.dispatchEvent(event, ...args);
	}
}