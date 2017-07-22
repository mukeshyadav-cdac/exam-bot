'use strict';

var RECASTAI = require('recastai');

/**
 * Call recast API to get the intent name and other entities
 */
exports.CallRecast = function(inputText, recastCb) {
	console.log('Came into RECAST',inputText);

	var CONTENT = require('../contents/exam.json');

	var CLIENT = new RECASTAI.request(CONTENT.recast_client_key, 'en');

	console.log('=======recast====text====', inputText);
	CLIENT.converseText(inputText).then(function(response) {
		console.log('=========response===========', JSON.stringify(response));
		var intentObject = {};
		if (response && response.intents && response.intents.length > 0) {
			//console.log(response.entities);

			intentObject.intent = response.intents[0].slug;
			intentObject.entities = response.entities;
		} else {
			intentObject.intent = 'fallback';
		}
		recastCb(intentObject);
	}).catch(function(error) {
		console.log('===========error================', error);
	});
};