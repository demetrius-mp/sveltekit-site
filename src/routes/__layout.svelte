<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import '../app.css';
	import DropdownToggle from '$lib/components/Bootstrap/Dropdown/DropdownToggle.svelte';
	import Offcanvas from '$lib/components/Bootstrap/Offcanvas/Offcanvas.svelte';

	let sidebarIsOpen = false;
	function openSidebar() {
		sidebarIsOpen = true;
	}
	function closeSidebar() {
		sidebarIsOpen = false;
	}
</script>

<div
	class="d-none d-md-flex position-fixed top-0 bottom-0 flex-column flex-shrink-0 p-3 bg-light"
	style="width: 280px;"
>
	<a
		href="/"
		class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
	>
		<svg class="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap" /></svg>
		<span class="fs-4">Sidebar</span>
	</a>
	<hr />
	<ul class="nav nav-pills flex-column mb-auto">
		<li class="nav-item">
			<a href="#" class="nav-link active" aria-current="page">
				<svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home" /></svg>
				Home
			</a>
		</li>
		<li>
			<a href="#" class="nav-link link-dark">
				<svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2" /></svg>
				Dashboard
			</a>
		</li>
		<li>
			<a href="#" class="nav-link link-dark">
				<svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#table" /></svg>
				Orders
			</a>
		</li>
		<li>
			<a href="#" class="nav-link link-dark">
				<svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid" /></svg>
				Products
			</a>
		</li>
		<li>
			<a href="#" class="nav-link link-dark">
				<svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle" /></svg
				>
				Customers
			</a>
		</li>
	</ul>
	<hr />
	<div class="d-flex justify-content-end">
		<a href="/"> Need some help? </a>
	</div>
</div>

<div class="content">
	<nav class="navbar bg-light">
		<div class="container-fluid">
			<span class="d-flex justify-content-between align-items-center gap-2">
				<button on:click={openSidebar} class="d-md-none button-without-styles">
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
				<a href="/" class="navbar-brand text-black">Grad Man</a>
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
	<div class="container">
		<slot />
	</div>
</div>

<Offcanvas width="280px" responsive="md" bind:open={sidebarIsOpen}>
	<div class="offcanvas-header">
		<h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
		<button on:click={closeSidebar} type="button" class="btn-close" aria-label="Close" />
	</div>
	<div class="offcanvas-body">
		<div>
			Some text as placeholder. In real life you can have the elements you have chosen. Like, text,
			images, lists, etc.
		</div>
	</div>
</Offcanvas>

<style>
	@media (min-width: 768px) {
		.content {
			padding-left: 280px;
		}
	}
</style>
