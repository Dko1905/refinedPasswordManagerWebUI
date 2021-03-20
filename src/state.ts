import {Account} from './entities/account'
import type {LoginData} from './entities/loginData'
import type {Token} from './entities/token'
import {getLoginDataCache, getTokenService} from './provider'

// This file has all state logic and caching

const defaultCallback = () => {
	throw Error('No default callback set')
}

class State {
	private _tokenService = getTokenService()
	private _loginDataCache = getLoginDataCache()

	getLoginData(): Promise<LoginData | null> {
		return this._loginDataCache.then(ldc => {
			return ldc.getLoginData()
		})
	}
	setLoginData(loginData: LoginData) {
		this._loginDataCache.then(ldc => {
			ldc.setLoginData(loginData)
		})
	}
	getTokenCallback(): () => Promise<Token> {
		return async (): Promise<Token> => {
			const ts = await this._tokenService
			const ldc = await this._loginDataCache

			const data = ldc.getLoginData()!!
			const account = new Account(null, data.username, data.password, null)

			return await ts.login(account)
		}
	}
}

export const state = new State()
