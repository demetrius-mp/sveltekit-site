<script lang="ts">
	import Modal from '$lib/components/Bootstrap/Modal/Modal.svelte';
	import type { Notification } from '$lib/repositories/NotificationRepository';

	export let open = true;
	export let notification: Notification | null = null;

	function closeCurrentNotificationModal() {
		open = false;
	}
</script>

<Modal bind:open>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">
					{notification?.sender}
				</h5>
				<button
					type="button"
					class="btn-close"
					on:click={closeCurrentNotificationModal}
					aria-label="Close"
				/>
			</div>
			<div class="modal-body">
				<h6>{notification?.title}</h6>
				{notification?.body}
			</div>
			<div class="modal-footer">
				<button type="button" on:click={closeCurrentNotificationModal} class="btn btn-secondary">
					Close
				</button>
			</div>
		</div>
	</div>
</Modal>
