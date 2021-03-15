import type {Credential} from "src/entities/credential";

export interface CredentialRepository {
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
	 * Get a credential from the repository.
	 * The promise will reject if the credential isn't found, or if any
	 * other error occurs.
	 * @param id - The id of the credential to get
	 * @returns A credential wrapped in a promise.
	 */
	getCredential(id: bigint): Promise<Credential>
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
	deleteCredential(id: bigint): Promise<void>
}
