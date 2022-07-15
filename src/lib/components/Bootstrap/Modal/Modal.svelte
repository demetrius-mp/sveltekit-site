<script lang="ts">
	import type { Modal } from 'bootstrap';
	import { onMount } from 'svelte';

	export let open = false;
	export let options: Partial<Modal.Options> = {};

	let modal: Modal | null = null;
	let modalEl: HTMLDivElement;
	onMount(async () => {
		const { default: Modal } = await import('bootstrap/js/dist/modal');

		const modalInstance = new Modal(modalEl, options);
		modal = modalInstance;

		function setIsOpenTrue() {
			open = true;
		}

		function setIsOpenFalse() {
			open = false;
		}

		modalEl.addEventListener('shown.bs.modal', setIsOpenTrue);

		modalEl.addEventListener('hidden.bs.modal', setIsOpenFalse);

		return () => {
			modalInstance.dispose();
			modalEl.removeEventListener('shown.bs.modal', setIsOpenTrue);
			modalEl.removeEventListener('hidden.bs.modal', setIsOpenFalse);
		};
	});

	$: {
		if (modal !== null) {
			if (open) {
				modal.show();
			} else {
				modal.hide();
			}
		}
	}
</script>

<div class="modal fade" tabindex="-1" bind:this={modalEl}>
	<slot />
</div>
