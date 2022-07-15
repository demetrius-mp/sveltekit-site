<script lang="ts">
	import Offcanvas from '$lib/components/Bootstrap/Offcanvas/Offcanvas.svelte';
	import SidebarContent from './SidebarContent.svelte';
	import sidebarStore from './sidebar.store';
</script>

<Offcanvas width="var(--sidebar-width)" responsive="md" bind:open={$sidebarStore}>
	<SidebarContent />
</Offcanvas>
