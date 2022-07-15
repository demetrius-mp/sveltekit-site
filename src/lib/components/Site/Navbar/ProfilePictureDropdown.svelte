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
