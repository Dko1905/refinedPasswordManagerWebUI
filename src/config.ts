export class Config {
	private _version: number
	private _baseUrl: string
	private _urlPostfixs: {
		auth: string
		account: string
		cred: string
	}

	// Setup default values
	constructor() {
		this._version = 2
		this._baseUrl = 'https://pm.190405.xyz/v2'
		this._urlPostfixs = {
			auth: this._baseUrl + '/auth/authenticate',
			account: this._baseUrl + '/auth/accounts',
			cred: this._baseUrl + '/credential/credentials'
		}
	}

	get version() {
		return this._version
	}
	set version(version: number) {
		this._version = version
	}
	get baseUrl() {
		return this._baseUrl + this._version
	}
	get urlPostfixes() {
		return this._urlPostfixs
	}
}
