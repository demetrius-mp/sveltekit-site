<script lang="ts">
	import type { Dropdown } from 'bootstrap';

	import { onMount } from 'svelte';

	export let options: Partial<Dropdown.Options> = {};
	let className = '';
	export { className as class };

	let dropdownEl: HTMLDivElement;
	onMount(async () => {
		const { default: Dropdown } = await import('bootstrap/js/dist/dropdown');

		const dropdownInstance = new Dropdown(dropdownEl, options);

		return () => {
			dropdownInstance.dispose();
		};
	});
</script>

<div
	bind:this={dropdownEl}
	{...$$restProps}
	class={className}
	type="button"
	data-bs-toggle="dropdown"
>
	<slot />
</div>
