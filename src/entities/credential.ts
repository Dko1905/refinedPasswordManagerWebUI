export class Credential {
	constructor(
		public readonly id: number | null,
		public readonly accountId: number,
		public readonly website: string,
		public readonly username: string,
		public readonly password: string,
		public readonly extra: string
	) {}
}
