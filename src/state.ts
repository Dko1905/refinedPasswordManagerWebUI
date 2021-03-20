import {Account} from './entities/account'
import type {LoginData} from './events/loginData'
import type {Token} from './entities/token'
import {getConfig, getLoginDataCache, getTokenService} from './provider'

// This file has all state logic and caching

const defaultCallback = () => {
	throw Error('No default callback set')
}

export class State {
	// Getting and setting loginData
	getLoginData(): Promise<LoginData | null> {
		return Promise.all([
			getLoginDataCache(),
			getConfig()
		]).then(([ldc, config]) => {
			const ld = ldc.getLoginData()

			if (ld) {
				config.version = ld.apiVersion
			}

			return ld
		})
	}
	setLoginData(loginData: LoginData): Promise<void> {
		return Promise.all([
			getLoginDataCache(),
			getConfig()
		]).then(([ldc, config]) => {
			ldc.setLoginData(loginData)
			ldc.useLocalStorage = loginData.cache
			config.version = `/${loginData.apiVersion}`
		})
	}
	// Get function to get Promise of Token
	getTokenCallback(): () => Promise<Token> {
		return async (): Promise<Token> => {
			const ts = await getTokenService()
			const ldc = await getLoginDataCache()

			const data = ldc.getLoginData()!!
			const account = new Account(null, data.username, data.password, null)

			return await ts.login(account)
		}
	}
}
