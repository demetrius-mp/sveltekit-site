<script lang="ts">
	import DropdownToggle from '$lib/components/Bootstrap/Dropdown/DropdownToggle.svelte';
</script>

<div class="dropdown">
	<DropdownToggle>
		<img
			class="rounded-circle"
			height="40"
			src="https://github.com/demetrius-mp.png"
			alt="Profile"
		/>
	</DropdownToggle>
	<div
		class="dropdown-menu dropdown-menu-end shadow"
		style="width: 11rem; border-radius: 0.375rem;"
		aria-labelledby="Profile Dropdown"
	>
		<div>
			<h6 class="dropdown-header text-wrap">
				Signed in as <strong>Demetrius Panovitch</strong>
			</h6>
		</div>
		<div><hr class="dropdown-divider" /></div>
		<div>
			<a class="dropdown-item" href="/">
				<i class="bi bi-person-circle me-1" /> Profile
			</a>
		</div>
		<div>
			<a class="dropdown-item" href="/">
				<i class="bi bi-gear me-1" /> Settings
			</a>
		</div>
		<div><hr class="dropdown-divider" /></div>
		<div>
			<a class="dropdown-item text-danger" href="/">
				<i class="bi bi-box-arrow-right me-1" /> Sign out
			</a>
		</div>
	</div>
</div>
