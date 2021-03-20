<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import {ListAddEvent} from '../events/listAddEvent'
	import type {Credential} from '../entities/credential'

	export let credentials: Credential[] = []

	const ed = createEventDispatcher<{add: ListAddEvent}>()

	const eventFunc = (id: number) => {
		ed('add', new ListAddEvent())
	}
</script>

<div class="app">
	<ul>
		{#each credentials as credential}
			<li><p on:click={() => eventFunc(credential.id!!)}>{credential.website} : {credential.username}</p></li>
		{/each}
	</ul>
</div>

<style>
</style>
