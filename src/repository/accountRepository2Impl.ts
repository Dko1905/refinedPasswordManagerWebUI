import {Token} from '../entities/token'
import type {Account} from '../entities/account'
import {getConfig} from '../provider'
import type {AccountRepository} from './accountRepository'
import {encode} from 'js-base64'
import type {SpringError} from '../entities/springError'

const fetch = window.fetch

export class AccountRepository2Impl implements AccountRepository {
	private _config = getConfig()
	private _tokenCallback: () => Promise<Token> = async () => {
		throw Error('Callback not set')
	}

	setTokenCallback(callback: () => Promise<Token>): void {
		this._tokenCallback = callback
	}
	async authenticate(account: Account): Promise<Token> {
		// Get async url
		const url = (await this._config).urlPostfixes.auth
		// Fetch resources
		const obj: Object = await fetch(url, {
			mode: 'cors',
			method: 'GET',
			headers: new Headers([
				['Content-Type', 'application/json'],
				['Accept', 'application/json'],
				[
					'Authorization',
					'Basic ' + encode(account.username + ':' + account.password)
				]
			])
		}).then((res) => res.json())
		// Check if error
		if (obj.hasOwnProperty('error')) {
			throw obj as SpringError
		} else {
			const obj2 = <{accountId: number, uuid: string, expirationDate: number}>obj
			const token = new Token(obj2.accountId, obj2.uuid, obj2.expirationDate)
			return token
		}
	}
	async addAccount(account: Account): Promise<Account> {
		throw new Error('Method not implemented.')
	}
	async updateAccount(account: Account): Promise<void> {
		throw new Error('Method not implemented.')
	}
	async getAccounts(): Promise<Account[]> {
		// Get async url
		const url = (await this._config).urlPostfixes.account
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
			return obj as Account[]
		}
	}
	async deleteAccount(id: number): Promise<void> {
		throw new Error('Method not implemented.')
	}
}
