<script lang="ts">
	import sidebarStore from './sidebar.store';
</script>

<div
	class="d-flex position-fixed top-0 bottom-0 flex-column flex-shrink-0 p-3 bg-light"
	style="width: var(--sidebar-width)"
>
	<div class="d-flex align-items-center justify-content-between">
		<a href="/" class="d-flex link-dark text-decoration-none">
			<span class="fs-4">Grad Man</span>
		</a>
		<button
			on:click={sidebarStore.close}
			type="button"
			class="d-md-none d-flex btn-close mb-1"
			aria-label="Close"
		/>
	</div>
	<hr class="my-2 mt-2" />
	<ul class="nav nav-pills flex-column mb-auto gap-1">
		<li class="nav-item">
			<a href="/" class="nav-link active" aria-current="page">
				<i class="bi bi-house pe-none me-2" />
				Home
			</a>
		</li>
		<li>
			<a href="/" class="nav-link link-dark">
				<i class="bi bi-speedometer2 pe-none me-2" />
				Dashboard
			</a>
		</li>
	</ul>
	<hr />
	<div class="d-flex justify-content-end">
		<a href="/"> Need some help? </a>
	</div>
</div>
