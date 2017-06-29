import * as platformTemplate from '../datasource/platform_template.js';
let  startList = [
    {
      "title": "Beginner",
      "overview": "Beginner starts here.",
      "buttonTitle": "Beginner",
      "payload": "beginner"
    },
    {
      "title": "Intermediate",
      "overview": "Intermediate starts here.",
      "buttonTitle": "Intermediate",
      "payload": "intermediate"
    },
    {
      "title": "Advanced",
      "overview": "Advanced starts  here",
      "buttonTitle": "Advanced",
      "payload": "advanced"
    }
  ]

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');

  let welcomeResponseText = content.get_started_yes;

  platformTemplate.createGenericTemplate(inputData, startList, function(genericTemplate) {
    let outputData = {
      userId: inputData.userId,
      responseType: 'THREE_TEXT_WITH_GENERIC_TEMPLATE',
      responseText: welcomeResponseText,
      responseImage: null,
      responseAudio: null,
      responseVideo: null,
      responseAttachment: genericTemplate,
      quickReplyButtons: null
    }
    cb(outputData);
  });
};

export { intent };
