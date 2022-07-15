<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import '../app.css';
	import DropdownToggle from '$lib/components/Bootstrap/Dropdown/DropdownToggle.svelte';
	import { Sidebar, sidebarStore } from '$lib/components/Site/Sidebar';
</script>

<Sidebar />

<div class="content">
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
			<div class="dropdown">
				<DropdownToggle>
					<img
						class="rounded-circle"
						height="40"
						src="https://github.com/demetrius-mp.png"
						alt="Profile"
					/>
				</DropdownToggle>
				<ul
					class="dropdown-menu dropdown-menu-end"
					style="max-width: 200px;"
					aria-labelledby="dropdownMenuButton1"
				>
					<li>
						<a class="dropdown-item" href="/">
							<i class="bi bi-person-circle me-1" /> Profile
						</a>
					</li>
					<li>
						<a class="dropdown-item" href="/">
							<i class="bi bi-gear me-1" /> Settings
						</a>
					</li>
					<li><hr class="dropdown-divider" /></li>
					<li>
						<a class="dropdown-item text-danger" href="/">
							<i class="bi bi-box-arrow-right me-1" /> Sign out
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<div class="container mt-3">
		<slot />
	</div>
</div>

<style>
	@media (min-width: 768px) {
		.content {
			padding-left: var(--sidebar-width);
		}
	}
</style>
