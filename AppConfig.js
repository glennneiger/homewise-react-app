/*
 AppConfig.js
 Configuration for App Configuration
 Global Variables for use in all JS Files
*/

export let ApiEndpoints = {
	'url': 'https://api.joinhomewise.com',
	'loginPath': '/agent/Login/',
	'registrationPath': '/agent/Registration/',
	'forgotpasswordPath': '/agent/ForgotPassword/',
	'changepasswordPath': '/agent/ChangePassword/',
	'clientPath': '/agent/Client/',
	'clientlistPath': '/agent/Clients/',
	'agentPath': '/agent/Agent/',
	'agentlistPath': '/agent/Agents/',
	'upcomingstepsPath': '/agent/UpcomingSteps/'
}

export let StorageKeys = {
	'authToken': '@HomeWiseTracker:authToken',
	'authExpiry': '@HomeWiseTracker:authExpiry'
}
