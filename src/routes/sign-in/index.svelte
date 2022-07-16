<script lang="ts">
	import stall from '$lib/utils/stall.utils';

	import { createForm } from 'svelte-forms-lib';

	const { form, handleSubmit, isSubmitting, isModified } = createForm<{
		username: string;
		password: string;
	}>({
		initialValues: {
			password: '',
			username: ''
		},
		onSubmit: async (values) => {
			await stall(300);
			alert(JSON.stringify(values));
		}
	});
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

<div class="d-flex flex-column vh-100 justify-content-center align-items-center">
	<div class="shadow p-3 card" style="border-radius: 0.75rem; max-width: 400px;">
		<div class="card-body">
			<div class="mb-3">
				<h2 class="fw-bold">Sign in to your account</h2>
			</div>
			<form on:submit={handleSubmit}>
				<div class="mb-3">
					<label for="username" class="form-label">Username</label>
					<input
						bind:value={$form.username}
						minlength="5"
						class="form-control form-control-lg"
						type="text"
						name="username"
						required
					/>
				</div>
				<div class="mb-3">
					<label for="password" class="form-label">Password</label>
					<input
						bind:value={$form.password}
						minlength="8"
						class="form-control form-control-lg"
						type="password"
						name="password"
						required
					/>
				</div>
				<div class="d-flex justify-content-between align-items-baseline mb-3">
					<div class="form-check">
						<input class="form-check-input" type="checkbox" name="rememberMe" />
						<label class="form-check-label" for="rememberMe">Remember me</label>
					</div>
					<div class="text-end">
						<small>
							<a href="/" class="text-muted text-decoration-underline cursor-pointer">
								Forgot your password?
							</a>
						</small>
					</div>
				</div>
				<button
					disabled={$isSubmitting || !$isModified}
					class="d-flex gap-2 align-items-center justify-content-center w-100 mt-3 btn btn-primary btn-lg"
				>
					{#if $isSubmitting}
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
					{/if}
					Sign in
				</button>
			</form>
		</div>
	</div>
</div>
