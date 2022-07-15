<script lang="ts">
	import { formatDate } from '$lib/utils/formatter.utils';
	import type { InputChangeEvent } from '$lib/utils/type.utils';

	interface Notification {
		id: string;
		sender: string;
		title: string;
		date: Date;
		read: boolean;
	}

	let notifications: Notification[] = [
		{
			date: new Date('2022-07-13'),
			id: '1',
			sender: 'Teacher Jane Doe',
			title: 'Lorem ipsum, dolor.',
			read: false
		},
		{
			date: new Date('2022-07-01'),
			id: '2',
			sender: 'Teacher Jane Doe',
			title: 'sit amet consectetur.',
			read: false
		},
		{
			date: new Date('2022-05-01'),
			id: '3',
			sender: 'Teacher John Doe',
			title: 'Modi quibusdam quidem.',
			read: false
		},
		{
			date: new Date('2021-01-24'),
			id: '4',
			sender: 'Teacher John Doe',
			title: 'voluptas pariatur ab.',
			read: false
		}
	];

	let selectedNotifications: Notification[] = [];
	let indeterminate = false;
	let checked = false;

	$: {
		indeterminate =
			selectedNotifications.length > 0 && selectedNotifications.length < notifications.length;

		checked = notifications.length > 0 && selectedNotifications.length === notifications.length;
	}

	const toggleAll: InputChangeEvent = (e) => {
		selectedNotifications = checked || indeterminate ? [] : notifications;
		checked = !checked && !indeterminate;
		e.currentTarget.checked = checked;
		indeterminate = false;
	};

	function bulkRead() {
		notifications = notifications.map((notification) => {
			notification.read = true;
			return notification;
		});

		selectedNotifications = [];
	}

	function bulkDelete() {
		notifications = [];
		selectedNotifications = [];
	}
</script>

<div class="d-sm-flex align-items-start flex-sm-row flex-column">
	<div class="flex-fill">
		<h1>Messages</h1>
		<p class="mt-2">
			Check the messages and notifications sent by your teachers, friends, and admins.
		</p>
	</div>
	<div class="mt-sm-4 mt-0">
		<button class="btn btn-primary w-100"> Send message </button>
	</div>
</div>
