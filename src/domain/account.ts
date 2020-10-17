enum AccountRole {
	user = 0,
	readonly = 1,
	admin = 2
}

class Account {
	id: number
	username: string
	password: string
	accountRole: AccountRole
	constructor(id: number, username: string, password: string, accountRole: AccountRole){
		this.id = id
		this.username = username
		this.password = password
		this.accountRole = accountRole
	}
}

export default Account
export type { Account, AccountRole }