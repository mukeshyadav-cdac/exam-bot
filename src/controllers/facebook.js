import config from '../config.json';
import * as facebookMessage from '../facebook/facebook_messages.js';
import request from 'request';
var RECASTAI 			= require('../intents/recastai.js');

let setGreetingText = (req, res) => {
  let fbData = {
    "greeting":[
      {
      "locale":"default",
      "text":"Hello!"
    }, {
      "locale":"en_US",
      "text":"Hi {{user_full_name}}, welcome to the exam bot."
    }
  ]
  }

  request({
    url: config.facebook.facebook_url+'/me/messenger_profile',
    qs: {access_token: config.facebook.page_token},
    method: 'POST',
    json: fbData
  },function(error, response, body) {
    console.log('======SetGreetingText======',body);
    res.status(200).send(body);
  });
}

let setGetStartedButton = (req, res) => {

  let fbData = {
    "get_started": {
      "payload": "GET_STARTED_PAYLOAD"
    }
  }

  request({
    url: config.facebook.facebook_url+'/me/messenger_profile  ',
    qs: {access_token: config.facebook.page_token},
    method: 'POST',
    json: fbData
  },function(error, response, body) {
    console.log('======SetGetStartedButton======',body);
    res.status(200).send(body);
  });
}

let getValidateToken = (req, res) => {
  if(req.query['hub.verify_token'] === config.facebook.verification_token) {
    return res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(500).send({"status": "error", "responseMessage": "Wrong verification token."});
  }
}

let getFBMessage = (req, res) => {
  let data = req.body;
  if (data.object === 'page') {
    data.entry.forEach( (entry) => {
      let pageID = entry.id;
      console.log(entry)
      entry.messaging.forEach( (event)  => {
        if (event.postback) {
          facebookMessage.receivedPostbackMessage(event);
         
        } else if (event.message && event.message.quick_reply) {
          console.log(event)
          console.log('cccccccccxxcxcxcxcxcxcxcxcxcxc')
          facebookMessage.receivedQuickReplyMessage(event);
        } else if (event.message && event.message.text){
          console.log("Webhook received unknown event: ", event);
           console.log("here_______", event.message.text);
           RECASTAI.CallRecast(event.message.text, function(recastObject) 
           {
                  console.log('====recastObject====',JSON.stringify(recastObject));
                  event.message.payload = recastObject.intent;
                  facebookMessage.receivedTextMessage(event);
			      });

        }
      });
    });
    res.sendStatus(200);
  }
};

export { getValidateToken, getFBMessage, setGreetingText, setGetStartedButton };
