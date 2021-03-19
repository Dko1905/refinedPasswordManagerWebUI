<script lang="ts">
	import type {LoginEvent} from './entities/loginEvent';
	import Login from './pages/Login.svelte'

	const test = (e: CustomEvent<LoginEvent>) => {
		console.log(e)
	}
</script>

<div class="app">
	<Login on:login={test} />
</div>

<style>
	.app {
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	}
</style>
