const { json } = require('express');
const { v4 } = require('uuid');
const { AsyncLocalStorage } = require('async_hooks');

const als = new AsyncLocalStorage();

function requestIdAsyncLocalStorageMiddleware(req, res, next) {
	als.run(new Map(), () => {
		const requestId = req.get('x-request-id') ? req.get('x-request-id') : v4();
		als.getStore().set('requestId', requestId);
		next();
	});
}

function getRequestContext() {
	const store = als.getStore();
	return store ? store.get('requestId') : undefined;
}

module.exports = { requestIdAsyncLocalStorageMiddleware, getRequestContext };