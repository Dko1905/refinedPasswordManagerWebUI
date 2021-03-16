export class Credential {
	constructor(
		public readonly id: bigint | null,
		public readonly website: string,
		public readonly username: string,
		public readonly password: string,
		public readonly extra: string
	) {}
}
