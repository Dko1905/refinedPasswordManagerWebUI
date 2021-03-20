import type {Account} from '../entities/account'
import type {Token} from '../entities/token'
import {getAccountRepository, getConfig} from '../provider'

export class TokenService {
	private _accountRepository = getAccountRepository()
	private _config = getConfig()
	private _currentToken: Token | null = null

	async login(account: Account): Promise<Token> {
		const repo = await this._accountRepository
		const conf = await this._config

		try {
			if (this._currentToken && this._currentToken.accountId == account.id) {
				// Check if token is old
				if (
					this._currentToken.expirationDate - conf.tokenMinTimeLeft <
					Date.now() / 1000
				) {
					this._currentToken = await repo.authenticate(account)
					return this._currentToken
				} else {
					return this._currentToken
				}
			} else {
				this._currentToken = await repo.authenticate(account)
				return this._currentToken
			}
		} catch (e) {
			throw e
		}
	}
	async getAccountId(account: Account): Promise<number> {
		const token = await this.login(account)
		return token.accountId
	}
}
