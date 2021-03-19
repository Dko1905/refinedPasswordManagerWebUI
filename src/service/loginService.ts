import type {Account} from '../entities/account'

export class LoginService {
	private _account: Account | null = null
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

	public getAccount(): Account | null {
		if (this._account) {
			return this._account
		} else if (this._localStorage) {
			const str = this._localStorage.getItem('loginInfo')
			if (str) {
				return JSON.parse(str)
			}
		}
		return null
	}
	public setAccount(account: Account) {
		this._account = account
		this._localStorage?.setItem('loginInfo', JSON.stringify(account))
	}
}
