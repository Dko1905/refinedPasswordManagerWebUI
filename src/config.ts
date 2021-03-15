
export class Config {
	private _version: number
	private _baseUrl: string

	// Setup default values
	constructor() {
		this._version = 2
		this._baseUrl = 'https://pm.190405.xyz'
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
}
