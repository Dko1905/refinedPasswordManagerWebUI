import type {LoginData} from '../events/loginData'

export class LoginDataCache {
	private _loginData: LoginData | null = null
	private _localStorage: Storage | null
	private _useLocalStorage: boolean = false

	constructor() {
		try {
			this._localStorage = window.localStorage
		} catch (e) {
			this._localStorage = null
			console.warn(`No localStorage was found: ${e}`, e)
		}
	}

	set useLocalStorage(yn: boolean) {
		this._useLocalStorage = yn
	}
	get useLocalStorage() {
		return this._useLocalStorage
	}

	public getLoginData(): LoginData | null {
		if (this._loginData) {
			return this._loginData
		} else if (this._localStorage) {
			const str = this._localStorage.getItem('loginData')
			if (str) {
				return JSON.parse(str)
			}
		}
		return null
	}
	public setLoginData(loginData: LoginData) {
		this._loginData = loginData
		if (loginData.cache)
			this._localStorage?.setItem('loginData', JSON.stringify(loginData))
	}
}
