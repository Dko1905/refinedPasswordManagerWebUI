import type {Token} from '../entities/token'
import type {Account} from '../entities/account'

export interface AccountRepository {
	/**
	 * Set token callback.
	 * @param callback Callback which returns a valid token
	 */
	setTokenCallback(callback: () => Promise<Token>): void
	/**
	 * Login, meaning that you get a token.
	 * @param account Account to login with
	 * @returns Valid `Token`
	 */
	authenticate(account: Account): Promise<Token>
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
	deleteAccount(id: number): Promise<void>
}
