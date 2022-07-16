import stall from '$lib/utils/stall.utils';
import { faker } from '@faker-js/faker';
import { orderBy, uniqueId } from 'lodash-es';

export interface Notification {
	id: string;
	sender: string;
	title: string;
	date: Date;
	read: boolean;
}

const notifications: Notification[] = Array.from({ length: 25 })
	.fill(0)
	.map(() => {
		return {
			date: faker.date.past(3),
			id: uniqueId(),
			sender: faker.name.findName(),
			title: faker.lorem.sentence(),
			read: Math.random() > 0.5
		};
	});

export type QueryManyOptions = Partial<{ query: string; page: number }>;

export interface NotificationRepository {
	queryMany(
		options: QueryManyOptions
	): Promise<{ items: Notification[]; itemsPerPage: number; totalItems: number }>;
	markManyAsRead(options: { ids: string[] }): Promise<void>;
	hasUnreadNotifications(): Promise<boolean>;
}

function createNotificationRepository(): NotificationRepository {
	const ITEMS_PER_PAGE = 5;

	return {
		async queryMany({ page = 1, query }) {
			await stall(300);

			const start = (page - 1) * ITEMS_PER_PAGE;
			const end = Math.min(start + ITEMS_PER_PAGE, notifications.length);

			const orderedNotifications = orderBy(notifications, ['read', 'date'], ['asc', 'desc']);

			const queriedNotifications = orderedNotifications
				.filter((v) => {
					if (query === undefined || query === '') return true;

					const lowerCaseQuery = query.toLowerCase();

					return (
						v.sender.toLowerCase().includes(lowerCaseQuery) ||
						v.title.toLowerCase().includes(lowerCaseQuery)
					);
				})
				.slice(start, end);

			return {
				items: queriedNotifications,
				itemsPerPage: ITEMS_PER_PAGE,
				totalItems: notifications.length
			};
		},
		async markManyAsRead({ ids }) {
			await stall(300);

			notifications.map((notification) => {
				notification.read = ids.includes(notification.id) ? true : notification.read;
			});
		},
		async hasUnreadNotifications() {
			await stall(300);

			return notifications.some((v) => !v.read);
		}
	};
}

const notificationRepository = createNotificationRepository();

export default notificationRepository;
