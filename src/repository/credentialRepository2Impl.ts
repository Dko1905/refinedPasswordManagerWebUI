import {Credential} from '../entities/credential'
import type {SpringError} from '../entities/springError'
import type {Token} from '../entities/token'
import {getConfig} from '../provider'
import type {CredentialRepository} from './credentialRepository'

const fetch = window.fetch

export class CredentialRepository2Impl implements CredentialRepository {
	private _config = getConfig()
	private _tokenCallback: () => Promise<Token> = async () => {
		throw new Error('Token callback not set')
	}

	setTokenCallback(callback: () => Promise<Token>): void {
		this._tokenCallback = callback
	}
	async addCredential(cred: Credential): Promise<Credential> {
		// Get async url
		const url = (await this._config).urlPostfixes.cred
		const token = await this._tokenCallback()
		// Fetch resources
		const text: string = await fetch(url, {
			mode: 'cors',
			method: 'POST',
			body: JSON.stringify(cred),
			headers: [
				['Content-Type', 'application/json'],
				['Accept', 'application/json'],
				['X-Auth-Token', JSON.stringify(token)]
			]
		}).then((res) => res.text())
		try {
			const obj: Object = JSON.parse(text)
			if (obj.hasOwnProperty('error')) {
				throw obj as SpringError
			} else {
				return new Credential(
					Number.parseInt(text),
					cred.accountId,
					cred.website,
					cred.username,
					cred.password,
					cred.extra
				)
			}
		} catch (e) {
			throw e
		}
	}
	async updateCredential(cred: Credential): Promise<void> {
		const url = (await this._config).urlPostfixes.cred
		const token = await this._tokenCallback()

		const text = await fetch(url, {
			mode: 'cors',
			method: 'PUT',
			body: JSON.stringify(cred),
			headers: [
				['Content-Type', 'application/json'],
				['Accept', 'application/json'],
				['X-Auth-Token', JSON.stringify(token)]
			]
		}).then((res) => res.text())
		if (text != '') {
			const err: SpringError = JSON.parse(text)
			throw err
		}
	}
	async getCredentials(): Promise<Credential[]> {
		// Get async url
		const url = (await this._config).urlPostfixes.cred
		const token = await this._tokenCallback()
		// Fetch resources
		const obj: Object = await fetch(url, {
			mode: 'cors',
			method: 'GET',
			headers: [
				['Content-Type', 'application/json'],
				['Accept', 'application/json'],
				['X-Auth-Token', JSON.stringify(token)]
			]
		}).then((res) => res.json())
		// Check if error
		if (obj.hasOwnProperty('error')) {
			throw obj as SpringError
		} else {
			return obj as Credential[]
		}
	}
	async deleteCredential(id: number): Promise<void> {
		// Get async url
		const url = (await this._config).urlPostfixes.cred
		const token = await this._tokenCallback()
		// Fetch resources
		const text: string = await fetch(url + `/${id}`, {
			mode: 'cors',
			method: 'DELETE',
			headers: [
				['Content-Type', 'application/json'],
				['Accept', 'application/json'],
				['X-Auth-Token', JSON.stringify(token)]
			]
		}).then((res) => res.text())
		if (text != '') {
			const obj: Object = JSON.parse(text)
			if (obj.hasOwnProperty('error')) {
				throw obj as SpringError
			}
		}
	}
}
