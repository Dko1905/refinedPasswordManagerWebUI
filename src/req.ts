import type Token from './domain/token'
import type Account from './domain/account'
import type SpringError from './domain/error/springError'
import type Credential from './domain/credential'
import { accountsUrl, authenticateUrl, credentialsUrl } from './url'
import { encode, decode } from 'js-base64'
const base64 = {
	encode, decode
}

// Auth
const authenticate = (username: string, password: string): Promise<Token | SpringError> => 
	fetch(authenticateUrl(), {
		headers: new Headers({
			'Authorization': `Basic ${base64.encode(`${username}:${password}`)}`
		})
	})
		.then(res => res.json())
const getAccount = (token: Token): Promise<Account[] | SpringError> =>
	fetch(accountsUrl(), {
		headers: new Headers({
			'X-Auth-Token': JSON.stringify(token)
		})
	})
		.then(res => res.json())
export { authenticate, getAccount }
// Credential
const getCredential = (token: Token): Promise<Credential[] | SpringError> =>
	fetch(credentialsUrl(), {
		headers: new Headers({
			'X-Auth-Token': JSON.stringify(token)
		})
	})
		.then(res => res.json())
const addCredential = (token: Token, credential: Credential): Promise<number | SpringError> =>
	fetch(credentialsUrl(), {
		headers: new Headers({
			'X-Auth-Token': JSON.stringify(token),
			'Content-Type': 'application/json'
		}),
		method: 'POST',
		body: JSON.stringify(credential)
	})
		.then(res => res.json())
const putCredential = (token: Token, credential: Credential): Promise<null | SpringError> =>
	fetch(credentialsUrl(), {
		headers: new Headers({
			'X-Auth-Token': JSON.stringify(token),
			'Content-Type': 'application/json'
		}),
		method: 'PUT',
		body: JSON.stringify(credential)
	})
		.then(res => res.text())
		.then(text => text === '' ? Promise.resolve(null) : Promise.resolve(JSON.parse(text)))
const deleteCredential = (token: Token, credentialId: number): Promise<null | SpringError> =>
	fetch(credentialsUrl() + `/${credentialId}`, {
		headers: new Headers({
			'X-Auth-Token': JSON.stringify(token)
		}),
		method: 'DELETE'
	})
		.then(res => res.text())
		.then(text => text === '' ? Promise.resolve(null) : Promise.resolve(JSON.parse(text)))
export { getCredential, addCredential, putCredential, deleteCredential }