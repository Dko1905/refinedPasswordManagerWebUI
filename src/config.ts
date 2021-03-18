export class Config {
	private _version: string
	private _baseUrl: string
	private _urlPostfixes: {
		auth: string
		account: string
		cred: string
	}
	// Minimum time left to live before refreshing, should be less or equal to
	// server config.
	private _tokenMinTimeLeft: number

	// Setup default values
	constructor() {
		this._version = '/v2'
		this._baseUrl = 'https://pm.190405.xyz'
		this._urlPostfixes = {
			auth: this._baseUrl + this._version + '/auth/authenticate',
			account: this._baseUrl + this._version + '/auth/accounts',
			cred: this._baseUrl + this._version + '/credential/credentials'
		}
		this._tokenMinTimeLeft = 3
	}

	get tokenMinTimeLeft() {
		return this._tokenMinTimeLeft
	}
	set version(version: string) {
		this._version = version
	}
	get baseUrl() {
		return this._baseUrl + this._version
	}
	get urlPostfixes() {
		return this._urlPostfixes
	}
}
