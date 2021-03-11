const { v4 } = require('uuid');

function requestIdMiddleware(req, res, next) {
	const requestId = req.get('x-request-id') ? req.get('x-request-id') : v4();
	req.requestId = requestId;
	return next();
}

module.exports = requestIdMiddleware;