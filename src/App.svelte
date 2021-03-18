<script lang="ts">
	import {Account} from './entities/account'
	import {Credential} from './entities/credential'
	import {
		getAccountRepository,
		getCredentialRepository,
		getTokenService
	} from './provider'

	let click: () => void, add: () => void, del: () => void, put: () => void
	let inputStr: string

		// Global async
	;(async () => {
		const aRepo = await getAccountRepository()
		const cRepo = await getCredentialRepository()
		const tokenService = await getTokenService()

		const account = new Account(null, 'example', 'example', null)
		const id = await tokenService.getAccountId(account)
		const cred = new Credential(null, id, 'google.com', '123', '123', '1')

		cRepo.setTokenCallback(() => tokenService.login(account))
		aRepo.setTokenCallback(() => tokenService.login(account))

		click = () => {
			cRepo.getCredentials().then(console.log)
		}
		add = () => {
			cRepo.addCredential(cred).then(console.log)
		}
		del = () => {
			cRepo.deleteCredential(Number.parseInt(inputStr)).then(console.log)
		}
		put = () => {
			cRepo
				.updateCredential(
					new Credential(Number.parseInt(inputStr), id, 'web', 'u', 'p', 'ex')
				)
				.then(console.log)
		}
	})()
</script>

<div class="App">
	<button on:click={click}>Click me!</button>
	<button on:click={add}>Add</button>
	<button on:click={del}>Delete</button>
	<input type="text" bind:value={inputStr} />
	<button on:click={put}>Update</button>
</div>
