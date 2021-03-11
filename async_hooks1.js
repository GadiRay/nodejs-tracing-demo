// Only init and destroy are used in this example
const asyncHooks = require('async_hooks');

function init(asyncId, type, triggerAsyncId, resource) { console.log({ asyncId, type, triggerAsyncId }) }
function destroy(asyncId) { console.log({ asyncId }) }

const asyncHook = asyncHooks.createHook({ init, destroy })
asyncHook.enable()


function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
	console.log('before delay');
	await delay(1000);
	console.log('done with delay');
})();