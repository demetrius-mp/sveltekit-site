<script lang="ts">
	import { sidebarStore } from '$lib/components/Site/Sidebar';
	import ProfilePictureDropdown from './ProfilePictureDropdown.svelte';
</script>

<nav class="navbar bg-light">
	<div class="container-fluid">
		<span class="d-flex justify-content-between align-items-center gap-2">
			<button on:click={sidebarStore.open} class="d-md-none button-without-styles">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
			<div class="d-md-none vr border border-dark" />
			<a href="/" class="d-md-none navbar-brand text-black">Grad Man</a>
		</span>
		<div class="d-flex align-items-center gap-3">
			<a class="text-decoration-none text-black mt-1" href="/">
				<i class="bi bi-bell" style="font-size: 1.5rem;" />
			</a>
			<ProfilePictureDropdown />
		</div>
	</div>
</nav>
