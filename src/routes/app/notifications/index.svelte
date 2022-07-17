<script lang="ts">
	import Pagination from '$lib/components/Bootstrap/Pagination/Pagination.svelte';
	import notificationStore from '$lib/stores/notifications.store';
	import { formatDate } from '$lib/utils/formatter.utils';
	import type { InputChangeEvent } from '$lib/utils/type.utils';
	import type { Notification, QueryManyOptions } from '$lib/repositories/NotificationRepository';
	import FilterInput from './_components/FilterInput.svelte';
	import Modal from '$lib/components/Bootstrap/Modal/Modal.svelte';

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
			query
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

	let currentNotification: Notification | null = null;

	$: loadNotifications({
		page: currentPage,
		query
	});

	$: start = (currentPage - 1) * itemsPerPage + 1;
	$: end = Math.min(start + itemsPerPage - 1, totalItems);
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

<div class="mt-3 mt-sm-0 d-flex gap-3 justify-content-between">
	<div class="flex-grow-1">
		<FilterInput placeholder="Search" on:change={({ detail }) => (query = detail)} />
	</div>
	<Pagination
		on:pageChange={({ detail }) => (currentPage = detail)}
		{itemsPerPage}
		{totalItems}
		{currentPage}
	/>
</div>

<div class="table-responsive">
	<table class="table table-striped table-bordered caption-top">
		<caption>
			{#if loading}
				<div class="d-flex align-items-center" style:height="24px">
					<div class="progress" style:width="250px">
						<div
							class="progress-bar progress-bar-striped progress-bar-animated"
							role="progressbar"
							style:width="100%"
							style:background-color="#acacac"
						/>
					</div>
				</div>
			{:else if totalItems > 0}
				Showing {start} to {end} of {totalItems} results.
			{:else}
				Showing 0 results.
			{/if}
		</caption>
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
					<td role="button" on:click={() => (currentNotification = notification)}>
						{#if !notification.read}
							<strong>{notification.sender}</strong>
						{:else}
							{notification.sender}
						{/if}
					</td>
					<td role="button" on:click={() => (currentNotification = notification)}>
						{notification.title}
					</td>
					<td>{formatDate(notification.date)}</td>
				</tr>
			{:else}
				<tr>
					<td colspan="4"> No notifications found. </td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<Modal open={Boolean(currentNotification)}>
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
					on:click={() => (currentNotification = null)}
					aria-label="Close"
				/>
			</div>
			<div class="modal-body">
				{currentNotification?.body}
			</div>
			<div class="modal-footer">
				<button
					type="button"
					on:click={() => (currentNotification = null)}
					class="btn btn-secondary">Close</button
				>
			</div>
		</div>
	</div>
</Modal>

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
