const fs = require("fs");
const time = require("moment");
const colors = require('colors');
const express = require('express');
const app = express();
const config = require('../config');
const Promise = require('bluebird');
const { getServers, getServerBundle } = require('./services/servers.js');
const bodyParser = require('body-parser');

module.exports = function(client){

	// Parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }));

	// Parse application/json
	app.use(bodyParser.json());

	app.get('/', (req, res) => {
		res.send('No Data Response.');
	});

	/**
	 * Get Servers that the bot is in.
	 */
	app.get('/guilds', (req, res) => {
		let serverList = getServers(client);
		res.json(serverList);
	});

	/**
	 * Get the Channels and Users the bot sees
	 *  in a given server.
	 */
	app.get('/guilds/:serverId', (req, res) => {
		let serverList = getServerBundle(client, req.params.serverId);
		res.json(serverList);
	});



	let port = config.webAdmin.port || 8898;
	app.listen(port,  ()=> {
		console.log(`WebAdmin Port Running on port ${port}`);
	})
	return app;
};