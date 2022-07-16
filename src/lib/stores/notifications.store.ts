import notificationRepository, {
	type NotificationRepository,
	type Notification
} from '$lib/repositories/NotificationRepository';
import { writable, type Writable } from 'svelte/store';

interface NotificationStore extends Writable<Notification[]> {
	markManyAsRead(options: { ids: string[] }): Promise<void>;
	load: NotificationRepository['queryMany'];
	hasUnreadNotifications: NotificationRepository['hasUnreadNotifications'];
}

function createNotificationStore(): NotificationStore {
	const { set, subscribe, update } = writable<Notification[]>([]);

	return {
		set,
		subscribe,
		update,
		async markManyAsRead({ ids }) {
			notificationRepository.markManyAsRead({ ids });
		},
		async load({ page, query }) {
			const result = await notificationRepository.queryMany({ page, query });
			set(result.items);
			return result;
		},
		async hasUnreadNotifications() {
			return await notificationRepository.hasUnreadNotifications();
		}
	};
}

const notificationStore = createNotificationStore();

export default notificationStore;
