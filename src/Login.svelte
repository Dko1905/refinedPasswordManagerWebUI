<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	const dispatch = createEventDispatcher()

	let fusername: HTMLInputElement
	let fpassword: HTMLInputElement
	let fenpassword: HTMLInputElement
	let fsavetolocal: HTMLInputElement

	// Events
	const submit = (e: Event) => {
		const username = fusername.value
		const password = fpassword.value
		const enpassword = fenpassword.value
		const savetolocal = fsavetolocal.checked

		if(username === "" || password === "")
			return

		dispatch('login', {
			username: username,
			password: password,
			enpassword: enpassword,
			savetolocal: savetolocal
		})
	}
	// Outside events
	export const setValues = (username: string, password: string, enpassword: string, savetolocal: boolean) => {
		try{
			fusername.value = username
			fpassword.value = password
			fenpassword.value = enpassword
			fsavetolocal.checked = savetolocal
		} catch(e){
			console.warn(`Failed to set values: ${e.toString()}`)
		}
	}

	// Logic
	const check = (e: Event) => {
		const elm: HTMLInputElement = e.target as HTMLInputElement
		const value: string = elm.value
		
		if(value === "" && elm.id !== "fenpassword"){
			elm.style.borderColor = "red"
		} else {
			elm.style.borderColor = "green"
		}
	}
</script>

<main id="loginFormContainer">
	<form on:submit|preventDefault={submit} id="loginForm">
		<label for="fusername">Username:</label><br/>
		<input bind:this={fusername} on:keyup={check} type="text" name="fusername" id="fusername" autocomplete="off" autocapitalize="off" autofocus/><br/>
		<label for="fpassword">Password:</label><br/>
		<input bind:this={fpassword} on:keyup={check} type="password" name="fpassword" id="fpassword" autocomplete="off" autocapitalize="off"/><br/>
		<label for="fenpassword">Encryption password:</label><br/>
		<input bind:this={fenpassword} on:keyup={check} type="password" name="fenpassword" id="fenpassword" autocomplete="off" autocapitalize="off"/><br/>
		<label for="fsavetolocal">Cache in localstorage:</label><br/>
		<input bind:this={fsavetolocal} type="checkbox" name="fsavetolocal" id="fsavetolocal"/><br/>
		<!-- Submit -->
		<div id="loginButtonContainer">
			<input type="submit" value="Login"/>
		</div>
	</form>
</main>

<style>
	#loginFormContainer {
		color: white;
		margin-top: 20vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#loginForm {
		background-color: blue;
		height: auto;
		width: min-content;
		padding: 5px;
	}
	#loginForm input[type="text"], input[type="password"] {
		border: none;
		border: solid thick black;
	}
	#loginButtonContainer {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>