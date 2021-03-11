// Only init and destroy are used in this example
const asyncHooks = require('async_hooks');
const Logger = require('./logger');

function init(asyncId, type, triggerAsyncId, resource) { Logger.log('asyncHooks init', { asyncId, type, triggerAsyncId }) };
function destroy(asyncId) { Logger.log('async hooks destroy', { asyncId }) };
const asyncHook = asyncHooks.createHook({ init, destroy })
asyncHook.enable();


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
	console.log('before delay');
    await delay(1000);
    console.log('done with delay');
})();