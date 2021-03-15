
export class Account {
	constructor(
		public readonly id: bigint,
		public readonly username: string,
		public readonly password: string,
		public readonly role: bigint
	) {}
}
