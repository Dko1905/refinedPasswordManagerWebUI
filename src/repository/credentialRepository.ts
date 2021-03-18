import type {Credential} from '../entities/credential'
import type {Token} from '../entities/token'

export interface CredentialRepository {
	/**
	 * Set token callback.
	 * @param callback Callback which returns a valid token
	 */
	setTokenCallback(callback: () => Promise<Token>): void
	/**
	 * Add credential to repository.
	 * The promise will reject if any error occurs.
	 * @param cred - Credential to add to repository
	 * @returns Returns a new credential with the id set.
	 */
	addCredential(cred: Credential): Promise<Credential>
	/**
	 * Update credential in repository.
	 * The promise will reject if the credential isn't found, or if any
	 * other error occurs.
	 * @param cred - Credential to update
	 * @returns Nothing in a `Promise<void>`
	 */
	updateCredential(cred: Credential): Promise<void>
	/**
	 * Get all credentials from repository.
	 * The promise will reject if any error occurs.
	 * @returns Array of credentials wrapped in a promise.
	 */
	getCredentials(): Promise<Array<Credential>>
	/**
	 * Delete credential from repository.
	 * The promise will reject if the credential isn't found, or if any
	 * other error occurs.
	 * @param id - Id of credential to delete
	 * @returns Nothing in a `Promise<void>`
	 */
	deleteCredential(id: number): Promise<void>
}
