<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let totalItems: number;
	export let itemsPerPage: number;
	export let currentPage = 1;

	const dispatch = createEventDispatcher<{ pageChange: number }>();

	function dispatchPageChange(pageNumber: number) {
		dispatch('pageChange', pageNumber);
	}

	$: disablePrevious = currentPage === 1;
	$: disableNext = currentPage === Math.ceil(totalItems / itemsPerPage);
</script>

<nav aria-label="Page navigation example">
	<ul class="pagination">
		<li class:disabled={disablePrevious} class="page-item">
			<button
				on:click={() => dispatchPageChange(currentPage - 1)}
				class="page-link"
				aria-label="Previous"
			>
				<span aria-hidden="true">&laquo;</span>
			</button>
		</li>
		<li class="page-item active">
			<a class="page-link" href="/notifications">{currentPage}</a>
		</li>
		<li class:disabled={disableNext} class="page-item">
			<button
				on:click={() => dispatchPageChange(currentPage + 1)}
				class="page-link"
				aria-label="Next"
			>
				<span aria-hidden="true">&raquo;</span>
			</button>
		</li>
	</ul>
</nav>
