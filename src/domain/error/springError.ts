class SpringError {
	timestamp: number
	exception: string
	status: number
	error: string
	path: string
	message: string
	constructor(timestamp: number, exception: string, status: number, error: string, path: string, message: string) {
		this.timestamp = timestamp
		this.exception = exception
		this.status = status
		this.error = error
		this.path = path
		this.message = message
	}
	toString(): string {
		return `SpringError(timestamp: ${this.timestamp}, exception: ${this.exception}, status: ${this.status}, error: ${this.error}, path: ${this.path}, message: ${this.message})`
	}
}

export default SpringError