export class Account {
	constructor(
		public readonly id: number | null,
		public readonly username: string,
		public readonly password: string,
		public readonly role: string | null
	) {}
}
