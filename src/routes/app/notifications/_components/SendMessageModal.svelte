<script lang="ts">
	import Modal from '$lib/components/Bootstrap/Modal/Modal.svelte';

	export let open = false;

	function closeModal() {
		open = false;
	}
</script>

<Modal bind:open>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Send a message</h5>
				<button type="button" class="btn-close" on:click={closeModal} aria-label="Close" />
			</div>
			<div class="modal-body">
				<span>Send message</span>
			</div>
			<div class="modal-footer justify-content-between">
				<button type="button" on:click={closeModal} class="btn btn-secondary"> Close </button>
				<button type="button" on:click={closeModal} class="btn btn-primary"> Send message </button>
			</div>
		</div>
	</div>
</Modal>
