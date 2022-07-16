<script lang="ts">
	import Pagination from '$lib/components/Bootstrap/Pagination/Pagination.svelte';
	import notificationStore from '$lib/stores/notifications.store';
	import { formatDate } from '$lib/utils/formatter.utils';
	import type { InputChangeEvent } from '$lib/utils/type.utils';
	import type { Notification, QueryManyOptions } from '$lib/repositories/NotificationRepository';

	let loading = true;
	let query = '';
	let currentPage = 1;
	let itemsPerPage = 0;
	let totalItems = 0;
	let notifications: Notification[] = [];
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

	async function bulkRead() {
		notificationStore.markManyAsRead({
			ids: selectedNotifications.map((notification) => notification.id)
		});

		loadNotifications({
			page: currentPage,
			query: ''
		});

		selectedNotifications = [];
	}

	async function loadNotifications(options: QueryManyOptions) {
		loading = true;
		const result = await notificationStore.load(options);

		itemsPerPage = result.itemsPerPage;
		totalItems = result.totalItems;
		notifications = result.items;
		loading = false;
	}

	$: loadNotifications({
		page: currentPage,
		query
	});
</script>

<svelte:head>
	<title>Notifications</title>
</svelte:head>

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

<div class="mt-3 mt-sm-0 d-flex justify-content-end">
	<Pagination
		on:pageChange={({ detail }) => (currentPage = detail)}
		{itemsPerPage}
		{totalItems}
		{currentPage}
	/>
</div>

<div class="table-responsive">
	<table class="table table-striped table-bordered">
		<thead>
			<tr>
				<th style="width: 0;" scope="col">
					<input
						on:change={toggleAll}
						{checked}
						{indeterminate}
						type="checkbox"
						class="form-check-input"
					/>
				</th>
				<th class="min-width-sender-column" scope="col">
					{#if selectedNotifications.length > 0}
						<div style="height: auto;" class="d-flex">
							<button on:click={bulkRead} class="btn btn-sm py-0 btn-outline-primary">
								Mark as read
							</button>
						</div>
					{:else}
						Sender
					{/if}
				</th>
				<th scope="col">Title</th>
				<th scope="col">Date</th>
			</tr>
		</thead>

		<tbody class:table-is-loading={loading}>
			{#each notifications as notification (notification.id)}
				{@const selected = selectedNotifications.includes(notification)}
				<tr class:row-selected={selected}>
					<td class="position-relative" style="width: 0;">
						{#if !notification.read}
							<div
								style="width: 0.125rem;"
								class="position-absolute top-0 bottom-0 start-0 bg-primary"
							/>
						{/if}
						<input
							bind:group={selectedNotifications}
							value={notification}
							type="checkbox"
							class="form-check-input"
						/>
					</td>
					<td role="button">
						{#if !notification.read}
							<strong>{notification.sender}</strong>
						{:else}
							{notification.sender}
						{/if}
					</td>
					<td role="button">
						{notification.title}
					</td>
					<td>{formatDate(notification.date)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.row-selected {
		background-color: rgba(0, 0, 0, 0.15);
	}

	.min-width-sender-column {
		min-width: 120px;
	}

	.table-is-loading {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
