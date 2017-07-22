import * as platformTemplate from '../datasource/platform_template.js';

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');

  let welcomeText = content.get_started_0+"++"+content.get_started_gif1+"++"+content.get_started_2+"++"+content.get_started_3+"++"+content.get_started_4+"++"+content.get_started_5;

 console.log(welcomeText);

  let template = {
    yes_payload: "get_started_yes",
    no_payload: "get_started_no"
  }

  platformTemplate.quickReplyButtonsYesOrNo(inputData, template, function(quickReplyButtonsTemplate) {
    let outputData = {
      userId: inputData.userId,
      responseType: 'MULTI_TEXT_IMAGE_WITH_QUICK_REPLY',
      responseText: welcomeText,
      responseImage: 'https://giphy.com/gifs/art-animation-hello-26xBwdIuRJiAIqHwA',
      responseAudio: null,
      responseVideo: null,
      responseAttachment: null,
      quickReplyButtons: quickReplyButtonsTemplate
    }
    cb(outputData);
  });
};

export { intent };
