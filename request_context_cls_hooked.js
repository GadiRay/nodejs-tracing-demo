const { v4 } = require('uuid');
const { createNamespace } = require('cls-hooked');

const ns = createNamespace('myNamespace');

function requestIdClsHookedMiddleware(req, res, next) {

	ns.bindEmitter(req);
	ns.bindEmitter(res);

	ns.run(() => {
		const requestId = req.get('x-request-id') ? req.get('x-request-id') : v4();
		ns.set('requestId', requestId);
		next();
	});

}

function getRequestContext() {
	return ns.get('requestId');
}
module.exports = { requestIdClsHookedMiddleware, getRequestContext };