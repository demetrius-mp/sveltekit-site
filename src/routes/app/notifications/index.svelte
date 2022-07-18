<script lang="ts">
	import notificationStore from '$lib/stores/notifications.store';
	import type { Notification, QueryManyOptions } from '$lib/repositories/NotificationRepository';
	import { formatDate } from '$lib/utils/formatter.utils';
	import {
		DataTable,
		DataTableBulkAction,
		SendMessageModal,
		NotificationDetailsModal
	} from './_components';

	let loading = true;
	let query = '';
	let currentPage = 1;
	let itemsPerPage = 0;
	let totalItems = 0;
	let notifications: Notification[] = [];
	let selected: Notification[] = [];

	const bulkActions = {
		read() {
			notificationStore.markManyAsRead({
				ids: selected.map((notification) => notification.id)
			});

			loadNotifications({
				page: currentPage,
				query
			});

			selected = [];
		}
	};

	async function loadNotifications(options: QueryManyOptions) {
		loading = true;
		const result = await notificationStore.load(options);

		itemsPerPage = result.itemsPerPage;
		totalItems = result.totalItems;
		notifications = result.items;
		loading = false;
	}

	let currentNotificationModalIsOpen = false;
	let currentNotification: Notification | null = null;

	function openCurrentNotificationModal(notification: Notification) {
		currentNotification = notification;
		currentNotificationModalIsOpen = true;
	}

	let sendMessageModalIsOpen = false;

	function openSendMessageModal() {
		sendMessageModalIsOpen = true;
	}

	$: loadNotifications({
		page: currentPage,
		query
	});
</script>

<svelte:head>
	<title>Notifications</title>
</svelte:head>

<div class="d-sm-flex align-items-start flex-sm-row flex-column mb-3">
	<div class="flex-fill">
		<h1>Messages</h1>
		<p class="mt-2">
			Check the messages and notifications sent by your teachers, friends, and admins.
		</p>
	</div>
	<div class="mt-sm-4 mt-0">
		<button on:click={openSendMessageModal} class="btn btn-primary w-100"> Send message </button>
	</div>
</div>

<DataTable
	items={notifications}
	bind:query
	bind:currentPage
	bind:selected
	{loading}
	{itemsPerPage}
	{totalItems}
	itemHasEmphasis={(item) => !item.read}
	itemKey={'id'}
	columns={['Sender', 'Title', 'Date']}
	itemPluralName="notifications"
>
	<svelte:fragment slot="bulk-actions">
		<DataTableBulkAction on:click={bulkActions.read}>Mark as read</DataTableBulkAction>
	</svelte:fragment>
	<svelte:fragment slot="row" let:item>
		<td role="button" on:click={() => openCurrentNotificationModal(item)}>
			{#if !item.read}
				<strong>{item.sender}</strong>
			{:else}
				{item.sender}
			{/if}
		</td>
		<td role="button" on:click={() => openCurrentNotificationModal(item)}>
			{item.title}
		</td>
		<td>{formatDate(item.date)}</td>
	</svelte:fragment>
</DataTable>

<NotificationDetailsModal
	bind:open={currentNotificationModalIsOpen}
	notification={currentNotification}
/>

<SendMessageModal bind:open={sendMessageModalIsOpen} />
