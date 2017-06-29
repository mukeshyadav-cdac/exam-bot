import * as platformTemplate from '../datasource/platform_template.js';

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');

  let startAnalyisText = content.get_started_no;

  platformTemplate.quickReplyButtonsYesOrNo(inputData, function(quickReplyButtonsTemplate) {
    let outputData = {
      userId: inputData.userId,
      responseType: 'TEXT',
      responseText: startAnalyisText,
      responseImage: null,
      responseAudio: null,
      responseVideo: null,
      responseAttachment: null,
      quickReplyButtons: null
    }
    cb(outputData);
  });
};

export { intent };
