<script lang="ts">
	import notificationStore from '$lib/stores/notifications.store';
	import type { Notification, QueryManyOptions } from '$lib/repositories/NotificationRepository';
	import DataTable from './_components/DataTable.svelte';
	import { formatDate } from '$lib/utils/formatter.utils';
	import Modal from '$lib/components/Bootstrap/Modal/Modal.svelte';

	let loading = true;
	let query = '';
	let currentPage = 1;
	let itemsPerPage = 0;
	let totalItems = 0;
	let notifications: Notification[] = [];
	let selected: Notification[] = [];

	async function bulkRead() {
		notificationStore.markManyAsRead({
			ids: selected.map((notification) => notification.id)
		});

		loadNotifications({
			page: currentPage,
			query
		});

		selected = [];
	}

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

	function closeCurrentNotificationModal() {
		currentNotificationModalIsOpen = false;
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
		<button class="btn btn-primary w-100"> Send message </button>
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
	bulkActionsCellMinWidth="120px"
>
	<div slot="bulk-actions" class="d-flex">
		<button on:click={bulkRead} class="btn btn-sm py-0 btn-outline-primary"> Mark as read </button>
	</div>
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

<Modal bind:open={currentNotificationModalIsOpen}>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<div class="d-flex flex-row flex-wrap">
					<div class="w-100">
						<h5 class="modal-title">
							{currentNotification?.sender}
						</h5>
					</div>
					<div>
						<small class="text-muted">{currentNotification?.title}</small>
					</div>
				</div>
				<button
					type="button"
					class="btn-close"
					on:click={closeCurrentNotificationModal}
					aria-label="Close"
				/>
			</div>
			<div class="modal-body">
				{currentNotification?.body}
			</div>
			<div class="modal-footer">
				<button type="button" on:click={closeCurrentNotificationModal} class="btn btn-secondary"
					>Close</button
				>
			</div>
		</div>
	</div>
</Modal>
