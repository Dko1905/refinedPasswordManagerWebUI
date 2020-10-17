<script lang="ts">
	import type Token from './domain/token'
	import Credential from './domain/credential'
	import type SpringError from './domain/error/springError'
	import { getCredential, addCredential, putCredential, deleteCredential, getAccount } from './req'
	import { createEventDispatcher, onMount } from 'svelte'
	import CryptoJS from 'crypto-js'

	import { getNotificationsContext } from 'svelte-notifications';

  const { addNotification } = getNotificationsContext();
	
	export let token: Token
	export let enpassword: string
	export let refreshToken: () => Promise<Token>

	const AESDecrypt = (str: string) => {
		let result = CryptoJS.AES.decrypt(str, enpassword).toString(CryptoJS.enc.Utf8)
		return result
	}
	const AESEncrypt = (str: string) => {
		let result =  CryptoJS.AES.encrypt(str, enpassword).toString()
		return result
	}

	let credentials: Promise<Credential[]> = Promise.reject('')

	let error: string = 'No current error';
	const showError = (e: string, e2: any) => {
		e = e.toString() // Just do it
		if(e == null || e == undefined){
			console.error('showError got null, FIX THIS!!! (1)')
			error = 'showError got null, FIX THIS!!! (1)'
		} else if(e2 == null || e2 == undefined){
			console.error(e + 'showError got null, FIX THIS!! (2)')
			error = e + 'showError got null, FIX THIS!! (2)'
		} else{
			if(e2.toString() == null || e2.toString() == undefined || e2.toString() == new Object().toString()){
				console.warn(`ShowError: ${e}: ${e2.message != null ? e2.message : e2}`)
			} else{
				console.warn(`ShowError: ${e}: ${e2.message != null ? e2.message : e2.toString()}`)
			}
			
			error = e.toString()
			addNotification({
				text: `Caught Error: ${e}: ${e2.message != null ? e2.message : e2.toString()}`,
				position: 'top-right',
				type: 'danger',
				removeAfter: 4000
			})
		}
	}
	const showInfo = (i: any, notificationType = 'success') => {
		if(i == null || i == undefined){
			showError('showInfo got null', new Error(''))
		} else{
			console.info(`showInfo: ${i.toString()}`)
			addNotification({
				text: `Info: ${i.toString()}`,
				position: 'top-right',
				type: notificationType,
				removeAfter: 3000
			})
		}
	}

	const dispatch = createEventDispatcher()
	// Logic
	const logout = () => {
		dispatch('logout')
	}
	const refresh = async () => {
		if(token.expirationDate < Date.now() / 1000){
			showInfo('Token expired')
			try{
				token = await refreshToken()
				showInfo('Refreshed token')
			} catch(e){
				showError('Failed to get new token', e)
			}
		}
	}

	// Net
	const getCredentials = (): void => {
		refresh()
			.then(() => {
				credentials = new Promise((resolve, reject) => {
					getCredential(token)
					.then(b => {
						if((b as SpringError).timestamp != null){
							const bs = b as SpringError
							reject(bs.message)
						} else{
							let c = b as Credential[]
							c = c.map((v) => {
								return new Credential(
									v.id,
									v.accountId,
									AESDecrypt(v.website),
									AESDecrypt(v.username),
									AESDecrypt(v.password),
									AESDecrypt(v.extra)
								)
							})
							resolve(c)
						}
					})
					.catch(e => {
						showError('getCredentials', e)
						reject(e)
					})
				})
			})
	}
	const invalidateButtons = (htmle: HTMLElement): void => {
		for(const child of htmle.children){
			let innerChild = child.children[0]
			if(innerChild.className.includes('saveButton') || innerChild.className.includes('deleteButton')){
				const innerChildButton = innerChild as HTMLButtonElement
				innerChildButton.disabled = true
				innerChildButton.style.color = 'red'
			}
		}
	}
	const validateButtons = (htmle: HTMLElement): void => {
		for(const child of htmle.children){
			let innerChild = child.children[0]
			if(innerChild.className.includes('saveButton') || innerChild.className.includes('deleteButton')){
				const innerChildButton = innerChild as HTMLButtonElement
				innerChildButton.disabled = false
				innerChildButton.style.color = 'white'
			}
		}
	}
	const repCredential = (e: Event, nu: number): void => {
		try{
			invalidateButtons((e.target as any).parentElement.parentElement)
		} catch(e){
			showError('invalidateButtons', e)
		}
		refresh().then(() => {
			credentials.then(credentials => {
				let cred = credentials[nu]
				if(cred == null || cred == undefined){
					showError('repCredential', 'Credential is null')
				} else{
					try{
						cred = new Credential(
							cred.id,
							cred.accountId,
							AESEncrypt(cred.website),
							AESEncrypt(cred.username),
							AESEncrypt(cred.password),
							AESEncrypt(cred.extra)
						)
					} catch(e){
						showError('repCredential', e)
					}
					putCredential(token, cred)
						.then(result => {
							if(result != null){
								showError('repCredential', result)
							} else{
								showInfo(`Successfully saved credential`)
							}
							validateButtons((e.target as any).parentElement.parentElement)
						})
						.catch(e2 => {
							validateButtons((e.target as any).parentElement.parentElement)
							showError('repCredential', e2)
						})
				}
			})
		})
	}
	const delCredential = (e: Event, nu: number): void => {
		try{
			invalidateButtons((e.target as any).parentElement.parentElement)
		} catch(e){
			showError('invalidateButtons', e)
		}
		refresh().then(() => {
			credentials.then(creds => {
				const cred = creds[nu]
				if(cred == null || cred == undefined){
					showError('delCredential', 'Credential is null')
				} else{
					deleteCredential(token, cred.id)
						.then(result => {
							if(result != null){
								showError('delCredential', result)
								validateButtons((e.target as any).parentElement.parentElement)
							} else{
								showInfo(`Successfully deleted credential`, 'warning')
								creds.splice(nu, 1)
								credentials = Promise.resolve(creds);
							}
						})
						.catch(e2 => {
							validateButtons((e.target as any).parentElement.parentElement)
							showError('delCredential', e2)
						})
				}
			})
		})
	}
	const add = () => {
		refresh().then(() => {
			credentials.then(credentials2 => {
				credentials2.push(new Credential(0, token.accountId, '', '', '', ''))
				credentials = Promise.resolve(credentials2)
			})
			credentials.then(credentials => {
				let cred = credentials[credentials.length - 1]
				let cred2: Credential
				try{
					cred2 = new Credential(
						cred.id,
						cred.accountId,
						AESEncrypt(cred.website),
						AESEncrypt(cred.username),
						AESEncrypt(cred.password),
						AESEncrypt(cred.extra)
					)
				} catch(e){
					showError('add', e)
					return
				}
				addCredential(token, cred2)
					.then(result => {
						if((result as SpringError).timestamp != null){
							showError('add', result)
						} else{
							cred.id = result as number
							showInfo(`Successfully added credential`, 'success')
						}
					})
					.catch(e2 => {
						showError('add', e2)
					})
			})
		})
		
	}
		
	onMount(getCredentials)
</script>

<main>
	<div id='buttonBox'>
		<button id='logout' on:click={logout}>Logout</button>
		<button id='refresh' on:click={getCredentials}>Refresh</button>
	</div>
	{#await credentials}
	<h2>Loading...</h2>
	{:then accounts}
	<table>
		<tr>
			<th>Website</th>
			<th>Username</th>
			<th>Password</th>
			<th>Extra</th>
		</tr>
		{#each accounts as account, index}
		<tr>
			<td><input class="inputBox" type="text" autocapitalize="off" autocomplete="off" bind:value={account.website}></td>
			<td><input class="inputBox" type="text" autocapitalize="off" autocomplete="off" bind:value={account.username}></td>
			<td><input class="inputBox" type="text" autocapitalize="off" autocomplete="off" bind:value={account.password}></td>
			<td><input class="inputBox" type="text" autocapitalize="off" autocomplete="off" bind:value={account.extra}></td>
			<td><button class="saveButton" on:click={e => repCredential(e, index)}>Save</button></td>
			<td><button class="deleteButton" on:click={e => delCredential(e, index)}>Delete</button></td>
		</tr>
		{/each}
	</table>
	<button id="add" on:click={add}>Add</button>
	{:catch e}
	<h1>Error: {e.toString()}: {e.message}: {JSON.stringify(e)}</h1>
	{/await}
	<h3>Last error: {error}</h3>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	table,tr,td {
		border: solid thin gainsboro;
	}
	#buttonBox {
		padding: 10px;
	}
	.inputBox {
		border: none;
	}
	/* User buttons */
	#logout {
		border: none;
		background-color: blue;
		border: solid thin blue;
		color: white;
	}
	#refresh {
		border: none;
		background-color: green;
		border: solid thin green;
		color: white;
	}
	#add {
		border: none;
		background-color: darkorange;
		border: solid thin darkorange;
		color: white;
		margin: 10px;
	}
	.saveButton {
		border: none;
		background-color: green;
		border: solid thin green;
		color: white;
	}
	.deleteButton {
		border: none;
		background-color: darkred;
		border: solid thin darkred;
		color: white;
	}
</style>