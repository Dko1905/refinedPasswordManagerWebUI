<script lang="ts">
	import { onMount } from 'svelte'
	import Notifications from 'svelte-notifications'

	import Login from './Login.svelte'
	import Home from './Home.svelte'

	import { authenticate } from './req'
	import { setBaseUrl } from './url'
	import type Token from './domain/token'
	import type SpringError from './domain/error/springError'

	let loginComp: Login | null = null
	let loggedIn = false
	let state: Promise<Token> = Promise.reject('')
	// Infomation about user
	let localStorage: Storage | null = window.localStorage
	let apiVersion: string
	let username: string
	let password: string
	let enpassword: string
	let savetolocal: boolean

	const login = (e: CustomEvent) => {
		loggedIn = true
		apiVersion = e.detail.apiVersion
		username = e.detail.username
		password = e.detail.password
		enpassword = e.detail.enpassword
		savetolocal = e.detail.savetolocal
		if(savetolocal){
			let storage = window.localStorage
			if(storage == null){
				console.warn('Local storage not available!')
			} else{
				storage.setItem('apiVersion', apiVersion)
				storage.setItem('username', username)
				storage.setItem('password', password)
				storage.setItem('enpassword', enpassword)
				storage.setItem('savetolocal', savetolocal ? '1' : '0')
			}
		}
		/* API VERSION SWITCH */
		setBaseUrl(apiVersion)
		state = new Promise((resolve, reject) => {
			authenticate(username, password)
				.then(b => {
					if((b as SpringError).timestamp != null){
						const bs = b as SpringError
						setTimeout(() => {
							loggedIn = false
						}, 3000)
						reject(bs.message)
					} else{
						resolve(b as Token)
					}
				})
				.catch(e => reject(e))
		})
	}

	const refreshToken = (): Promise<Token> => {
		/* Don't change state because it creates bugs, but this might also create. */
		return new Promise((resolve, reject) => {
			authenticate(username, password)
				.then(b => {
					if((b as SpringError).timestamp != null){
						const bs = b as SpringError
						setTimeout(() => {
							loggedIn = false
						}, 3000)
						reject(bs.message)
					} else{
						resolve(b as Token)
					}
				})
		})
	}

	const logout = (e: CustomEvent) => {
		loggedIn = false
		state = Promise.reject('')
		localStorage.clear();
	}

	onMount(() => {
		if(localStorage == null){
			console.warn('Local storage not available!')
		} else{
			apiVersion = localStorage.getItem('apiVersion')
			username = localStorage.getItem('username')
			password = localStorage.getItem('password')
			enpassword = localStorage.getItem('enpassword')
			savetolocal = localStorage.getItem('savetolocal') === '1' ? true : false

			if(
				username !== null &&
				password !== null &&
				enpassword !== null &&
				savetolocal !== null && savetolocal !== false
			){
				if (!apiVersion) {
					apiVersion = 'v2'
				}
				if(loginComp != null){
					loginComp.setValues(apiVersion, username, password, enpassword, savetolocal)
				} else{
					console.warn('loginComp was null')
				}
			}
		}
	})
</script>

<Notifications>
<main>
	{#if loggedIn}
	{#await state}
	<h2 style='text-align: center;'>Loggin in...</h2>
	{:then token}
	<Home refreshToken={refreshToken} enpassword={enpassword} token={token} on:logout={logout}/>
	{:catch e}
	<h1>Error: {e.toString()}</h1>
	{/await}
	{:else}
	<Login bind:this={loginComp} on:login={login}/>
	{/if}
</main>
</Notifications>

<style>
</style>