export class Token {
	constructor(
		public readonly accountId: number,
		public readonly uuid: string,
		public readonly expirationDate: number
	) {}
}
