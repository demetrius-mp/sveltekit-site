<script lang="ts">
	import Modal from '$lib/components/Bootstrap/Modal/Modal.svelte';
	import recipientStore from '$lib/stores/recipient.store';

	export let open = false;
	function closeModal() {
		open = false;
	}

	let textAreaEl: HTMLTextAreaElement;
	function resize() {
		textAreaEl.style.height = 'auto';
		textAreaEl.style.height = 4 + textAreaEl.scrollHeight + 'px';
	}

	let recipient = '';
	let loadingRecipient = false;
	let recipientDoesNotExists = false;
	let recipientDoesExists = false;
	async function searchRecipient() {
		loadingRecipient = true;
		const foundRecipient = await recipientStore.findOne(recipient);

		if (foundRecipient === undefined) {
			recipientDoesExists = false;
			recipientDoesNotExists = true;
		} else {
			recipientDoesNotExists = false;
			recipientDoesExists = true;
		}

		loadingRecipient = false;
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
				<form class="d-flex gap-2 flex-column">
					<div>
						<label for="recipient" class="form-label">Recipient</label>
						<div class="input-group has-validation">
							<input
								class:is-invalid={recipientDoesNotExists}
								class:is-valid={recipientDoesExists}
								bind:value={recipient}
								name="recipient"
								type="text"
								class="form-control"
							/>
							<button
								on:click={searchRecipient}
								class="btn btn-outline-primary"
								disabled={loadingRecipient}
								type="button"
							>
								{#if loadingRecipient}
									<div class="spinner-border spinner-border-sm" role="status">
										<span class="visually-hidden">Loading...</span>
									</div>
								{:else}
									<i class="bi bi-search" />
								{/if}
							</button>
							{#if recipientDoesNotExists}
								<div class="invalid-feedback">Recipient does not exists.</div>
							{/if}
						</div>
					</div>
					<div>
						<label for="title" class="form-label">Title</label>
						<input name="title" type="text" class="form-control" />
					</div>
					<div>
						<label for="body" class="form-label">Body</label>
						<textarea
							bind:this={textAreaEl}
							on:input={resize}
							class="form-control"
							name="body"
							rows="3"
						/>
					</div>
				</form>
			</div>
			<div class="modal-footer justify-content-between">
				<button type="button" on:click={closeModal} class="btn btn-secondary"> Close </button>
				<button type="button" on:click={closeModal} class="btn btn-primary"> Send message </button>
			</div>
		</div>
	</div>
</Modal>
