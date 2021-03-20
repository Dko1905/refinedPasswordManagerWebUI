<script lang="ts">
	import {onMount} from 'svelte'
	import type {LoginData} from './entities/loginData'
	import Login from './pages/Login.svelte'
	import {getAccountRepository, getCredentialRepository, getState} from './provider'

	let loginElm: Login
	let loginCallback: (e: CustomEvent<LoginData>) => void;
	let loggedIn: boolean = false

	onMount(() => {
		Promise.all([
			getState(),
			getAccountRepository(),
			getCredentialRepository()
		]).then(([state, accountRepository, credentialRepository]) => {
			// Read from localstorage and use it.
			state.getLoginData().then(ld => {
				if (ld) {
					loginElm.setLoginData(ld)
				}
			})

			// Setup callback
			loginCallback = async (e: CustomEvent<LoginData>) => {
				await state.setLoginData(e.detail)
				accountRepository.setTokenCallback(state.getTokenCallback())
				credentialRepository.setTokenCallback(state.getTokenCallback())

				credentialRepository.getCredentials().then(console.log)
			}
		})
	})
</script>

<div class="app">
	{#if !loggedIn}
	<Login bind:this={loginElm} on:login={loginCallback} />
	{:else}
	<p>Logged in</p>
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
