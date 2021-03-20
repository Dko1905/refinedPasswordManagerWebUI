export class LoginData {
	constructor(
		public username: string,
		public password: string,
		public epassword: string,
		public cache: boolean,
		public apiVersion: string
	) {}
}
