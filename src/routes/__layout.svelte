<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import '../app.css';
	import Sidebar from '$lib/components/Site/Sidebar';
	import Navbar from '$lib/components/Site/Navbar';
</script>

<Sidebar />

<div class="content">
	<Navbar />
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
