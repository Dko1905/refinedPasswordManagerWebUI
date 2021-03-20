<script lang="ts">
	import {onMount} from 'svelte'
	import type {Credential} from './entities/credential'
	import type {LoginData} from './events/loginData'
	import Login from './pages/Login.svelte'
	import PList from './pages/PList.svelte'
	import {
		getAccountRepository,
		getCredentialRepository,
		getState
	} from './provider'

	let loginElm: Login
	let pListElm: PList

	let loginCallback: (e: CustomEvent<LoginData>) => void
	let logState: 'out' | 'moving' | 'in' = 'out'

	let credentials: Credential[] = []

	onMount(() => {
		Promise.all([
			getState(),
			getAccountRepository(),
			getCredentialRepository()
		]).then(([state, accountRepository, credentialRepository]) => {
			// Read from localstorage and use it.
			state.getLoginData().then((ld) => {
				if (ld) {
					loginElm.setLoginData(ld)
				}
			})

			// Setup callback
			loginCallback = async (e: CustomEvent<LoginData>) => {
				await state.setLoginData(e.detail)
				accountRepository.setTokenCallback(state.getTokenCallback())
				credentialRepository.setTokenCallback(state.getTokenCallback())

				logState = 'moving'
				// Fetch credentials and display in list
				credentialRepository.getCredentials().then((v) => {
					console.log(v)
					logState = 'in'
					credentials = v
				})
			}
		})
	})
</script>

<div class="app">
	{#if logState == 'out'}
		<Login bind:this={loginElm} on:login={loginCallback} />
	{:else if logState == 'moving'}
		<p>Loggin in...</p>
	{:else}
		<PList bind:this={pListElm} bind:credentials />
	{/if}
</div>

<style>
	.app {
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	}
</style>
