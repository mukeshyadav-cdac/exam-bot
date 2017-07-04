import * as platformTemplate from '../datasource/platform_template.js';

let LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = new LocalStorage('./localDatabase');

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');
  let storageKey = inputData.userId + '_advanced_topic_1';
  let userLevel = localStorage.getItem(storageKey);
  let contentData = {title: "Next", payload: "advanced_topic_1"};
  const images = require('../contents/images.json')["advanced"]["topic_1"];

  if ( userLevel  ) {
    if ( images[(parseInt(userLevel) + 1)] ) {
      contentData.imageUrl =  images[[(parseInt(userLevel) + 1)]];
      userLevel = parseInt(userLevel) + 1;
    } else {
      contentData.imageUrl =  images[0];
      userLevel = 0;
    }
  } else {
    userLevel = {};
    contentData.imageUrl =  images[0]
    userLevel = 0;
  }

  localStorage.setItem(storageKey, userLevel);

  if ( images && (images.length <= ( userLevel + 1)) ) {
    contentData.payload = "beginner_excercise";
    localStorage.removeItem(storageKey);
  }

  platformTemplate.createImageTemplateWithTwoQr(inputData, contentData, function(template) {
    let outputData = {
      userId: inputData.userId,
      responseType: 'IMAGE_WITH_QR',
      responseText: template.qr.text,
      responseImage: template.imageUrl,
      responseAudio: null,
      responseVideo: null,
      responseAttachment: null,
      quickReplyButtons: template.qr.template
    }
    cb(outputData);
  });
};

export { intent };

