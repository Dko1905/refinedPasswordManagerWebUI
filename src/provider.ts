import type {AccountRepository} from './repository/accountRepository'
import {AccountRepository2Impl} from './repository/accountRepository2Impl'

export function accountRepositoryProvider(): AccountRepository {
	return new AccountRepository2Impl()
}
