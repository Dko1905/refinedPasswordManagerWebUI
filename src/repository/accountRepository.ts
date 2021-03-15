import type {Account} from '../entities/account'

export interface AccountRepository {
	/**
	 * Add account to repository.
	 * The promise will reject if any error occurs.
	 * @returns Returns a new account with the id set.
	 * @param account Account to add to repository.
	 */
	addAccount(account: Account): Promise<Account>
	/**
	 * Update account in repository.
	 * The promise will reject if the credential isn't found, or if any
	 * other error occurs.
	 * @returns Nothing in a `Promise<void>`
	 * @param account Account to update
	 */
	updateAccount(account: Account): Promise<void>
	/**
	 * Get all accounts from repository.
	 * The promise will reject if any error occurs.
	 * @returns Array of accounts wrapped in a promise.
	 */
	getAccounts(): Promise<Array<Account>>
	/**
	 * Delete account from repository.
	 * The promise will reject if the credential isn't found, or if any
	 * other error occurs.
	 * @param id - Id of account to delete
	 * @returns Nothing in a `Promise<void>`
	 */
	deleteAccount(id: bigint): Promise<void>
}
