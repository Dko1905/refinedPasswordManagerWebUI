export class LoginEvent {
	constructor(
		public username: string,
		public password: string,
		public epassword: string,
		public cache: boolean,
		public apiversion: string
	) {}
}
