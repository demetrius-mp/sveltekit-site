<script lang="ts">
	import type { Offcanvas } from 'bootstrap';

	import { onMount } from 'svelte';

	export let open = false;
	export let options: Partial<Offcanvas.Options> = {};
	export let responsive: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | false = false;
	export let placement: 'start' | 'end' | 'top' | 'bottom' = 'start';
	export let width = '400px';

	$: responsiveClass = responsive ? `offcanvas offcanvas-${responsive}` : 'offcanvas';
	$: placementClass = `offcanvas-${placement}`;

	let offcanvas: Offcanvas | null = null;
	let offcanvasEl: HTMLDivElement;
	onMount(async () => {
		const { default: Offcanvas } = await import('bootstrap/js/dist/offcanvas');

		const offcanvasInstance = new Offcanvas(offcanvasEl, options);
		offcanvas = offcanvasInstance;

		function setIsOpenTrue() {
			open = true;
		}

		function setIsOpenFalse() {
			open = false;
		}

		offcanvasEl.addEventListener('shown.bs.offcanvas', setIsOpenTrue);

		offcanvasEl.addEventListener('hidden.bs.offcanvas', setIsOpenFalse);

		return () => {
			offcanvasInstance.dispose();
			offcanvasEl.removeEventListener('shown.bs.offcanvas', setIsOpenTrue);
			offcanvasEl.removeEventListener('hidden.bs.offcanvas', setIsOpenFalse);
		};
	});

	$: {
		if (offcanvas !== null) {
			if (open) {
				offcanvas.show();
			} else {
				offcanvas.hide();
			}
		}
	}
</script>

<div bind:this={offcanvasEl} style:width class="{responsiveClass} {placementClass}" tabindex="-1">
	<slot />
</div>
