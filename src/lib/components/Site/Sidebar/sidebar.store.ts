import { writable, type Writable } from 'svelte/store';

interface SidebarStore {
	subscribe: Writable<boolean>['subscribe'];
	set: Writable<boolean>['set'];
	open(): void;
	close(): void;
}

function createSidebarStore(): SidebarStore {
	const { set, subscribe } = writable<boolean>(false);

	return {
		subscribe,
		set,
		close() {
			set(false);
		},
		open() {
			set(true);
		}
	};
}

const sidebarStore = createSidebarStore();

export default sidebarStore;
