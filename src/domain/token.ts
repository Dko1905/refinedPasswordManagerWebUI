class Token {
	accountId: number
	uuid: string
	expirationDate: number
	constructor(accountId: number, uuid: string, expirationDate: number){
		this.accountId = accountId
		this.uuid = uuid
		this.expirationDate = expirationDate
	}
}

export default Token