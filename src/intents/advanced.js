import * as platformTemplate from '../datasource/platform_template.js';

let intent = (inputData, object, cb) => {

  let content = require('../contents/'+inputData.bot+'.json');

  let  startList = [
      {
        "title": "Topic 1",
        "overview": "Description.",
        "buttonTitle": "Topic 1",
        "payload": "advanced_topic_1"
      },
      {
        "title": "Topic 2",
        "overview": "Description.",
        "buttonTitle": "Topic 2",
        "payload": "advanced_topic_2"
      },
      {
        "title": "Topic 3",
        "overview": "Description.",
        "buttonTitle": "Topic 3",
        "payload": "advanced_topic_3"
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
