import type {Credential} from '../entities/credential'

export class ListAddEvent {
	constructor(public readonly credential: Credential) {}
}
