const express = require('express');

const Logger = require('./logger');

const requestIdMiddleware = require('./request_id_middleware');
// const { requestAsyncHooksIdMiddleware } = require('./request_context_async_hooks');


const app = express();
const PORT = 3003;


app.use(requestIdMiddleware);
// app.use(requestAsyncHooksIdMiddleware);

const requestHandler = (req, res, next) => {
	const { requestId } = req;
    Logger.log('start handling request', { serviceName: 'Service3', requestId });
    // do some stuff
    Logger.log('done handling request', { serviceName: 'Service3', requestId });
    res.json({ service3: `Hello from Service 3` });
};

app.get('/', requestHandler)

app.listen(PORT, (err) => {
    Logger.log(`server is listening on ${PORT}`, { serviceName: 'Service3' });
});