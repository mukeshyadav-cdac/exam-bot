import * as platformTemplate from '../datasource/platform_template.js';

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');

  let welcomeText = content.get_started_1+"++"+content.get_started_gif_1+"++"+content.get_started_2;

 console.log(welcomeText);

  let template = {
    yes_payload: "get_started_yes",
    no_payload: "get_started_no"
  }

  platformTemplate.quickReplyButtonsYesOrNo(inputData, template, function(quickReplyButtonsTemplate) {
    let outputData = {
      userId: inputData.userId,
      responseType: 'THREE_TEXT_WITH_QUICK_REPLY',
      responseText: welcomeText,
      responseImage: null,
      responseAudio: null,
      responseVideo: null,
      responseAttachment: null,
      quickReplyButtons: quickReplyButtonsTemplate
    }
    cb(outputData);
  });
};

export { intent };
