<script lang="ts">
	import type { InputChangeEvent } from '$lib/utils/type.utils';
	import { debounce } from 'lodash-es';
	import { createEventDispatcher } from 'svelte';

	export let placeholder = '';

	const dispatch = createEventDispatcher<{ change: string }>();

	function dispatchChange(detail: string) {
		dispatch('change', detail);
	}

	const debouncedDispatchChange = debounce(dispatchChange, 700);

	const handleInputChange: InputChangeEvent = (e) => {
		debouncedDispatchChange(e.currentTarget.value);
	};
</script>

<input type="search" {placeholder} class="form-control" on:input={handleInputChange} />
