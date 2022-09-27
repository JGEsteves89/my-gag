const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	console.log('Proxy was set up');
	app.use(
		'/v1',
		createProxyMiddleware({
			target: 'https://9gag.com',
			changeOrigin: true,
		})
	);
};
