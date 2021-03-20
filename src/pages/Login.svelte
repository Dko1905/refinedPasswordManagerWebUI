<!-- Login component, the component only dispatches events, it does not have any logic. -->
<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import {LoginData} from '../events/loginData'

	const dispatch = createEventDispatcher<{login: LoginData}>()

	let ed: LoginData = new LoginData('', '', '', true, 'v3')
	const formSubmit = (e: Event) => {
		dispatch('login', ed)
	}
	export const setLoginData = (ld: LoginData) => {
		ed = ld
	}
</script>

<div id="container">
	<form on:submit|preventDefault={formSubmit} id="form">
		<input type="text" bind:value={ed.username} placeholder="username" /><br />
		<input type="text" bind:value={ed.password} placeholder="password" /><br />
		<input type="text" bind:value={ed.epassword} placeholder="epassword" /><br
		/>
		<div id="checkBoxes">
			<label for="cacheLogin">Cache session:</label>
			<input
				type="checkbox"
				bind:checked={ed.cache}
				id="cacheLogin"
				name="cacheLogin"
			/>
		</div>
		<div class="versContainer">
			<label for="apiVersion">Api version:</label>
			<select bind:value={ed.apiVersion} name="apiVersion" id="apiVerison">
				<option value="v2">v2</option>
				<option default value="v3">v3</option>
			</select>
		</div>
		<div class="btnContainer">
			<input type="submit" value="Login" />
		</div>
	</form>
</div>

<style>
	#container {
		position: absolute;
		left: 50%;
		top: 40%;
		-ms-transform: translateY(-50%) translateX(-50%);
		transform: translateY(-50%) translateX(-50%);
	}
	#form {
		background-color: blue;
		color: white;
		margin: 10px;
		padding: 7px;
		border-radius: 5px;
	}
	#form * {
		margin: 2px;
	}
	#form .btnContainer {
		text-align: center;
	}
	#form .btnContainer input {
		background-color: green;
		color: white;
		border-radius: 5px;
		border: thin solid white;
		padding: 4px;
	}
	#form .btnContainer input:active {
		background-color: darkgreen;
	}
	#form #checkBoxes input {
		display: inline-block;
		padding-right: 10px;
		white-space: nowrap;
	}
	#form #checkBoxes input {
		vertical-align: middle;
	}
	.versContainer select {
		border: 0;
	}
</style>
