const baseUrlTmpl = 'https://pm.190405.xyz/'
let baseUrl = baseUrlTmpl
const setBaseUrl = (version: string) => {
	baseUrl = baseUrlTmpl + version
}
const authenticateUrl = () => baseUrl + '/auth/authenticate'
const accountsUrl = () => baseUrl + '/auth/accounts'
const credentialsUrl = () => baseUrl + '/credential/credentials'

export { setBaseUrl, authenticateUrl, accountsUrl, credentialsUrl }