<script lang="ts">
	import {onMount} from 'svelte'
	import type {Credential} from './entities/credential'
import type { ListAddEvent } from './events/listAddEvent';
	import type {LoginData} from './events/loginData'
	import Login from './pages/Login.svelte'
	import PList from './pages/PList.svelte'
	import {
		getAccountRepository,
		getCredentialRepository,
		getState
	} from './provider'

	// Elements
	let loginElm: Login
	let pListElm: PList

	// Callbacks
	let loginCallback: (e: CustomEvent<LoginData>) => void
	let addCred: (e: CustomEvent<ListAddEvent>) => Promise<Credential>

	// Variables
	let credentials: Credential[] = []
	let logState: 'out' | 'moving' | 'in' = 'out'

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

			// Setup callbacks
			loginCallback = async (e: CustomEvent<LoginData>) => {
				// Get login data and set callbacks
				await state.setLoginData(e.detail)
				accountRepository.setTokenCallback(state.getTokenCallback())
				credentialRepository.setTokenCallback(state.getTokenCallback())
				// Currently loggin in
				logState = 'moving'
				// Fetch credentials and display in list
				credentials = await credentialRepository.getCredentials()
				logState = 'in'
			}
			addCred = (e) => {
				return credentialRepository.addCredential(e.detail.credential)
			}
		})
	})

</script>

<div class="app">
	{#if logState == 'out'}
		<Login bind:this={loginElm} on:login={loginCallback} />
	{:else if logState == 'moving'}
		<h3 id="loginStatus">Loggin in...</h3>
	{:else}
		<PList bind:this={pListElm} bind:credentials on:add={addCred} />
	{/if}
</div>

<style>
	.app {
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	}
	#loginStatus {
		padding: 15px;
		background-color: white;
		color: black;
		border-radius: 5px;
		position: absolute;
		left: 50%;
		top: 40%;
		-ms-transform: translateY(-50%) translateX(-50%);
		transform: translateY(-50%) translateX(-50%);
	}
</style>
