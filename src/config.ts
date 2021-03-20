export class Config {
	private _version: string
	private _baseUrl: string
	// Minimum time left to live before refreshing, should be less or equal to
	// server config.
	private _tokenMinTimeLeft: number

	// Setup default values
	constructor() {
		this._version = '/v2'
		this._baseUrl = 'https://pm.190405.xyz'
		this._tokenMinTimeLeft = 3
	}

	get tokenMinTimeLeft() {
		return this._tokenMinTimeLeft
	}
	set version(version: string) {
		this._version = version
	}
	get version() {
		return this._version
	}
	get baseUrl() {
		return this._baseUrl + this.version
	}
	get urlPostfixes() {
		return {
			auth: this.baseUrl + '/auth/authenticate',
			account: this.baseUrl + '/auth/accounts',
			cred: this.baseUrl + '/credential/credentials'
		}
	}
}
