import type {Account} from 'src/entities/account'
import type {AccountRepository} from './accountRepository'

export class AccountRepository2Impl implements AccountRepository {
	addAccount(account: Account): Promise<Account> {
		throw new Error('Method not implemented.')
	}
	updateAccount(account: Account): Promise<void> {
		throw new Error('Method not implemented.')
	}
	getAccounts(): Promise<Account[]> {
		throw new Error('Method not implemented.')
	}
	deleteAccount(id: bigint): Promise<void> {
		throw new Error('Method not implemented.')
	}
}
