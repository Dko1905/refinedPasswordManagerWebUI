export class SpringError extends Error {
	constructor(
		public readonly error: string,
		public readonly message: string,
		public readonly path: string,
		public readonly status: number,
		public readonly timestamp: Date
	) {
		super(message)
		this.name = SpringError.name
	}
}
