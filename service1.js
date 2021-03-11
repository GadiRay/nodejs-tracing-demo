const express = require('express');
const axios = require('axios');

const getCharacterById = require('./db');
const Logger = require('./logger');

const requestIdMiddleware = require('./request_id_middleware');
// const { requestAsyncHooksIdMiddleware, getRequestContext} = require('./request_context_async_hooks');
// const { requestIdClsHookedMiddleware, getRequestContext } = require('./request_context_cls_hooked');
// const { requestIdAsyncLocalStorageMiddleware, getRequestContext} = require('./request_context_async_local_storage');


const app = express();
const PORT = 3001;
const SERVICE_2_URL = 'http://localhost:3002';


function getUserNameFromDB(id, requestId) {
	Logger.log(`Getting user name with id ${id} from DB`, { serviceName: 'Service1', requestId });
	const name = getCharacterById(id);
	Logger.log(`Got user name of ${name} from id ${id}`, { serviceName: 'Service1', requestId });
	return name;
}

async function getService2Response(requestId) {
	// const requestId = getRequestContext();
	Logger.log(`Calling Service2`, { serviceName: 'Service1', requestId });
	const { data } = await axios.get(SERVICE_2_URL, { headers: { 'x-request-id': requestId } });
	Logger.log(`Got response from Service2`, { ...data, serviceName: 'Service1', requestId });
	return data;
}

app.use(requestIdMiddleware);
// app.use(requestAsyncHooksIdMiddleware);
// app.use(requestIdClsHookedMiddleware)
// app.use(requestIdAsyncLocalStorageMiddleware);

const requestHandler = async (req, res, next) => {
	const { id } = req.params;
	const { requestId } = req;
	const name = getUserNameFromDB(id, requestId);
	const service2 = await getService2Response(requestId);
	res.json({ service1: `Hello ${name} from Service 1`, ...service2 });
	return next();
};

app.get('/:id', requestHandler);

app.listen(PORT, (err) => {
	Logger.log(`server is listening on ${PORT}`, { serviceName: 'Service1' });
});

