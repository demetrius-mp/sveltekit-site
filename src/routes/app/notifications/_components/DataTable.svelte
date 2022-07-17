<script lang="ts">
	import Pagination from '$lib/components/Bootstrap/Pagination/Pagination.svelte';
	import type { InputChangeEvent } from '$lib/utils/type.utils';
	import FilterInput from './FilterInput.svelte';

	type T = $$Generic;

	// table items
	export let items: T[];
	export let itemKey: keyof T;
	export let itemHasEmphasis: (item: T) => boolean;
	export let columns: string[];
	let firstColumn = columns[0];
	let otherColumns = columns.slice(-columns.length + 1);

	export let loading: boolean;

	// pagination
	export let currentPage: number;
	export let itemsPerPage: number;
	export let totalItems: number;
	export let itemPluralName: string;
	$: start = (currentPage - 1) * itemsPerPage + 1;
	$: end = Math.min(start + itemsPerPage - 1, totalItems);

	// filtering
	export let query: string;

	// bulk actions
	export let bulkActionsCellMinWidth: string;

	// item selection
	export let selected: T[];
	let indeterminate = false;
	let checked = false;
	$: indeterminate = selected.length > 0 && selected.length < items.length;
	$: checked = items.length > 0 && selected.length === items.length;

	const toggleAll: InputChangeEvent = (e) => {
		selected = checked || indeterminate ? [] : items;
		checked = !checked && !indeterminate;
		e.currentTarget.checked = checked;
		indeterminate = false;
	};
</script>

<div class="d-flex gap-3 justify-content-between">
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

<div class="position-relative table-responsive">
	{#if selected.length > 0}
		<div class="bulk-action-container">
			<slot name="bulk-actions" />
		</div>
	{/if}
	<table class="table table-striped table-bordered caption-top">
		<caption>
			{#if loading}
				<div class="d-flex align-items-center" style:height="24px">
					<div class="progress progress-bar-width">
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
				<th
					style:--bulk-action-cell-width={bulkActionsCellMinWidth}
					class="bulk-action-cell"
					scope="col"
				>
					{firstColumn}
				</th>
				{#each otherColumns as column (column)}
					<th scope="col">{column}</th>
				{/each}
			</tr>
		</thead>

		<tbody class:table-is-loading={loading}>
			{#each items as item (item[itemKey])}
				{@const itemIsSelected = selected.includes(item)}
				<tr class:row-selected={itemIsSelected}>
					<td class="position-relative" style="width: 0;">
						{#if itemHasEmphasis(item)}
							<div
								style="width: 0.125rem;"
								class="position-absolute top-0 bottom-0 start-0 bg-primary"
							/>
						{/if}
						<input bind:group={selected} value={item} type="checkbox" class="form-check-input" />
					</td>
					<slot name="row" {item} />
				</tr>
			{:else}
				<tr>
					<td colspan={columns.length + 1}> No {itemPluralName} found. </td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.row-selected {
		background-color: rgba(0, 0, 0, 0.15);
	}

	.bulk-action-cell {
		min-width: var(--bulk-action-cell-width);
	}

	.table-is-loading {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.bulk-action-container {
		min-width: var(--bulk-action-cell-width);
		left: 40px;
		top: 50px;
		position: absolute;
		background-color: white;
	}

	.progress-bar-width {
		width: 230px;
	}
</style>
