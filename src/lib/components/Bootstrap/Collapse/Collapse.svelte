<script lang="ts">
	import { slide } from 'svelte/transition';

	export let open = false;
</script>

{#if open}
	<div transition:slide class="collapse show">
		<slot />
	</div>
{/if}
