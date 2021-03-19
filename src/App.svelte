<script lang="ts">
	import Login from './pages/Login.svelte'

	const test = (e) => {
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
