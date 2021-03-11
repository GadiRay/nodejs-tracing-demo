const asyncHooks = require('async_hooks');
const { v4 } = require('uuid');


const store = new Map();

function init(asyncId, type, triggerAsyncId, resource) {
	// Store same context data for child async resources
	if (store.has(triggerAsyncId)) {
		store.set(asyncId, store.get(triggerAsyncId));
	}
}
function destroy(asyncId) {
	if (store.has(asyncId)) {
		store.delete(asyncId);
	}
}
asyncHooks.createHook({ init, destroy }).enable();


function getRequestContext() {
	return store.get(asyncHooks.executionAsyncId());
}

function requestAsyncHooksIdMiddleware(req, res, next) {
	const requestId = req.get('x-request-id') ? req.get('x-request-id') : v4();
	store.set(asyncHooks.executionAsyncId(), requestId);
	return next();
}

module.exports = { requestAsyncHooksIdMiddleware, getRequestContext }