import {Config} from './config'
import type {AccountRepository} from './repository/accountRepository'
import {AccountRepository2Impl} from './repository/accountRepository2Impl'
import type {CredentialRepository} from './repository/credentialRepository'
import {CredentialRepository2Impl} from './repository/credentialRepository2Impl'

/* Simple dependency resolver that only uses singletons *and* supports circular references. */
const cache: Map<string, Promise<unknown>> = new Map()
const chelper = <T>(type: {new (): T}): Promise<T> => {
	return new Promise((resolve) => {
		if (cache.has(type.name)) {
			cache.get(type.name)!!.then((val) => resolve(<T>val))
		} else {
			let resolve2: any
			cache.set(
				type.name,
				new Promise((resolve3) => {
					resolve2 = resolve3
				})
			)
			const obj = new type()
			resolve2(obj)
			resolve(obj)
		}
	})
}

export function getAccountRepository(): Promise<AccountRepository> {
	return chelper(AccountRepository2Impl)
}

export function getCredentialRepository(): Promise<CredentialRepository> {
	return chelper(CredentialRepository2Impl)
}

export function getConfig(): Promise<Config> {
	return chelper(Config)
}
