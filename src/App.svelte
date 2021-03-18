<script lang="ts">
	import {Account} from './entities/account'
	import {Credential} from './entities/credential'
	import {getAccountRepository, getCredentialRepository} from './provider'

	const accountRepository = getAccountRepository()
	const credentialRepository = getCredentialRepository()

	const authAccount = new Account(null, 'example', 'example', null)

	const click = () => {
		Promise.all([accountRepository, credentialRepository]).then(
			([acc, cred]) => {
				acc.authenticate(authAccount).then((token) => {
					acc.setTokenCallback(() => Promise.resolve(token))
					cred.setTokenCallback(() => Promise.resolve(token))

					cred.getCredentials().then(console.log)
				})
			}
		)
	}
	const add = () => {
		Promise.all([accountRepository, credentialRepository]).then(
			([acc, cred]) => {
				acc.authenticate(authAccount).then((token) => {
					acc.setTokenCallback(() => Promise.resolve(token))
					cred.setTokenCallback(() => Promise.resolve(token))

					cred
						.addCredential(
							new Credential(null, token.accountId, 'new account', '', '', '')
						)
						.then(console.log)
				})
			}
		)
	}
	let idStr: string = ''
	const del = () => {
		Promise.all([accountRepository, credentialRepository]).then(
			([acc, cred]) => {
				acc.authenticate(authAccount).then((token) => {
					acc.setTokenCallback(() => Promise.resolve(token))
					cred.setTokenCallback(() => Promise.resolve(token))

					cred.deleteCredential(Number.parseInt(idStr)).then(console.log)
				})
			}
		)
	}
	const put = () => {
		Promise.all([accountRepository, credentialRepository]).then(
			([acc, cred]) => {
				acc.authenticate(authAccount).then((token) => {
					acc.setTokenCallback(() => Promise.resolve(token))
					cred.setTokenCallback(() => Promise.resolve(token))

					cred
						.updateCredential(
							new Credential(
								Number.parseInt(idStr),
								token.accountId,
								'321',
								'321',
								'321',
								'ABC'
							)
						)
						.then(console.log)
				})
			}
		)
	}
</script>

<div class="App">
	<button on:click={click}>Click me!</button>
	<button on:click={add}>Add</button>
	<button on:click={del}>Delete</button>
	<input type="text" bind:value={idStr} />
	<button on:click={put}>Update</button>
</div>
