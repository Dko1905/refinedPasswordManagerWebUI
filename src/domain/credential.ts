class Credential {
	id: number
	accountId: number
	website: string
	username: string
	password: string
	extra: string
	constructor(id: number, accountId: number, website: string, username: string, password: string, extra: string){
		this.id = id
		this.accountId = accountId
		this.website = website
		this.username = username
		this.password = password
		this.extra = extra
	}
	toString(): string {
		return `Credential(id: ${this.id}, accountId: ${this.accountId}, website: ${this.website}, username: ${this.username}, password: ${this.password}, extra: ${this.extra})`
	}
}

export default Credential