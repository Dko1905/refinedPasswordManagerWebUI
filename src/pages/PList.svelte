<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import {ListAddEvent} from '../events/listAddEvent'
	import type {Credential} from '../entities/credential'

	export let credentials: Credential[] = []

	const ed = createEventDispatcher<{add: ListAddEvent}>()

	const eventFunc = (credential: Credential) => {
		ed('add', new ListAddEvent())
	}
</script>

<div class="app">
	<ul>
		{#each credentials as credential}
			<li><p on:click={e => eventFunc(credential)}>{credential.website} : {credential.username}</p></li>
		{/each}
	</ul>
</div>
