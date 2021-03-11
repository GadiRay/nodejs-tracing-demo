const express = require('express');
const axios = require('axios');

const Logger = require('./logger');

const requestIdMiddleware = require('./request_id_middleware');
// const { requestAsyncHooksIdMiddleware, getRequestContext} = require('./request_context_async_hooks');



const app = express();
const PORT = 3002;
const SERVICE_3_URL = 'http://localhost:3003';

async function getService3Response(requestId) {
	// const requestId = getRequestContext();

	Logger.log(`Calling Service3`, { serviceName: 'Service2', requestId });
	const { data } = await axios.get(SERVICE_3_URL, { headers: { 'x-request-id': requestId } });
	Logger.log(`Got response from Service3`, { ...data, serviceName: 'Service2', requestId });
	return data;
}

app.use(requestIdMiddleware);
// app.use(requestAsyncHooksIdMiddleware);

const requestHandler = async (req, res, next) => {
    const { requestId } = req;

    Logger.log('start handling request', { serviceName: 'service2', requestId });
    const service3 = await getService3Response(requestId);
    Logger.log('done handling request', { serviceName: 'service2', requestId });
    res.json({ service2: `Hello from Service 2`, ...service3 });
};

app.get('/', requestHandler)

app.listen(PORT, (err) => {
    Logger.log(`server is listening on ${PORT}`, { serviceName: 'Service2' });
});

