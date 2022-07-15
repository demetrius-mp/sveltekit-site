<script lang="ts">
	import { fade } from 'svelte/transition';

	export let open = false;
	export let dismissible = false;
	let className = '';
	export { className as class };

	function closeAlert() {
		open = false;
	}
</script>

{#if open}
	<div
		transition:fade={{ duration: 150 }}
		class="alert {className}"
		class:alert-dismissible={dismissible}
		role="alert"
	>
		<slot />
		{#if dismissible}
			<button on:click={closeAlert} type="button" class="btn-close" aria-label="Close" />
		{/if}
	</div>
{/if}
