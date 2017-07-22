import * as platformTemplate from '../datasource/platform_template.js';

let intent = (inputData, object, cb) => {

  let content = require('../contents/'+inputData.bot+'.json');

  let  startList = [
      {
        "title": "Amour",
        "overview": "Description.",
        "buttonTitle": "Topic 1",
        "payload": "advanced_amour"
      },
      {
        "title": "Brocante",
        "overview": "Description.",
        "buttonTitle": "Topic 2",
        "payload": "advanced_brocante"
      },
      {
        "title": "Familier",
        "overview": "Description.",
        "buttonTitle": "Topic 3",
        "payload": "advanced_familier"
      }
    ]



  let welcomeResponseText = content.beginner_one + '++' + content.beginner_two;

  platformTemplate.createGenericTemplate(inputData, startList, function(genericTemplate) {
    let outputData = {
      userId: inputData.userId,
      responseType: 'TWO_TEXT_WITH_GENERIC_TEMPLATE',
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
