'use strict';

/* Magic Mirror
 * Module: MMM-atHome
 *
 * By Stuart McNally
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({

	start: function() {
		var self = this;
		console.log("Starting node helper for: " + this.name);

		this.config = null;
	},

	getData: function() {
		var self = this;
		  
    var atHomeUrl = this.config.atHomeUrl;
    var atHomeEmail = this.config.email;
		
		request({
			url: atHomeUrl,
      headers: { 'X-email': atHomeEmail },
			method: 'GET',
		}, function (error, response, body) {
			if (response && response.statusCode) {
				if (!error && response.statusCode == 200) {
					self.sendSocketNotification("COLLECTION", body);
					}
				}
			else {
			self.sendSocketNotification("UNKNOWN_ERROR", "Error found within get data request: " + response + " Body: " + body);
			}
		});
		
		setTimeout(function() { self.getData(); }, this.config.refreshInterval);
		},
	
	socketNotificationReceived: function(notification, payload) {
		if (notification === 'CONFIG') {
			this.config = payload;
		}
		else if (notification === "DATA" && this.config !== null){
			this.getData();
		}
	}
});