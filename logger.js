const { writeFileSync } = require('fs');

// const { getRequestContext } = require('./request_context_async_hooks');
// const { getRequestContext } = require('./request_context_cls_hooked');
// const { getRequestContext } = require('./request_context_async_local_storage');

class Logger {
	static log(message, object) {
		const time = new Date().getTime();
		// const requestId = getRequestContext();
		if (object) {
			writeFileSync('log.json', `${JSON.stringify({ time, message, ...object })}\n`, { flag: 'a' });
		}
		else {
			writeFileSync('log.json', `${JSON.stringify({ time, message })}\n`, { flag: 'a' });
		}
	}
}

module.exports = Logger;
