import * as facebookApi from '../facebook/facebook_api.js';
import User from '../models/user.js';

let respondToUser = (response) => {
  switch(response.responseType) {

    case 'TEXT_WITH_QUICK_REPLY':
      facebookApi.senderAction(response.userId, 'typing_on');
      facebookApi.sendQuickReplyMessage(response.userId, response.responseText, response.quickReplyButtons.template, () =>{
        facebookApi.senderAction(response.userId, 'typing_off');
        return;
      });
      break;

    case 'TEXT':
      facebookApi.senderAction(response.userId, 'typing_on');
      facebookApi.sendTextMessage(response.userId, response.responseText, () => {
        facebookApi.senderAction(response.userId, 'typing_off');
        return;
      });
      break;

    case 'TEXT_WITH_GENERIC_TEMPLATE':
      facebookApi.sendTextMessage(response.userId, response.responseText, () => {
        facebookApi.senderAction(response.userId, 'typing_on');
        facebookApi.sendGenericTemplate(response.userId, response.responseAttachment, function() {
          facebookApi.senderAction(response.userId, 'typing_off');
          return;
        });
      });
      break;;

    case 'TWO_TEXT_WITH_GENERIC_TEMPLATE':
      var textMessage = response.responseText;
      var textMessageArray = textMessage.split("++");
      facebookApi.sendTextMessage(response.userId, textMessageArray[0], () => {
        facebookApi.senderAction(response.userId, 'typing_on');
        setTimeout(function () {
          facebookApi.senderAction(response.userId, 'typing_off');
          facebookApi.sendTextMessage(response.userId, textMessageArray[1], () => {
            facebookApi.sendGenericTemplate(response.userId, response.responseAttachment, function () {
              return;
            });
          });
        }, 2000);
      });
      break;

    case 'IMAGE_WITH_QR':
      facebookApi.sendImage(response.userId, response.responseImage, function () {
        facebookApi.sendQuickReplyMessage(response.userId, response.responseText, response.quickReplyButtons, function () {
          return;
        });
      });
      break;

    case 'BUTTON_WEBVIEW':
      facebookApi.senderAction(response.userId, 'typing_on');
      setTimeout(() => {
        facebookApi.senderAction(response.userId, 'typing_off');
        facebookApi.sendGenericTemplate(response.userId, response.responseAttachment, function() {
          return;
        });
      }, 3000)
      break;

    case 'THREE_TEXT_WITH_WEB_VIEW':
      var textMessage = response.responseText;
      var textMessageArray = textMessage.split("++");
      facebookApi.sendTextMessage(response.userId, textMessageArray[0], () => {
        facebookApi.senderAction(response.userId, 'typing_on');
        setTimeout(() => {
          facebookApi.senderAction(response.userId, 'typing_off');
          facebookApi.sendTextMessage(response.userId, textMessageArray[1], () => {
            facebookApi.senderAction(response.userId, 'typing_on');
            setTimeout(() =>{
              facebookApi.sendWebViewTemplate(response.userId, textMessageArray[2], response.responseAttachment, (genericTemplateResponse) => {
                facebookApi.senderAction(response.userId, 'typing_off');
                return;
              });
            }, 3000);
          });
        }, 3000);
      });
      break;

    case 'TWO_TEXT_WITH_QUICK_REPLY':
      var textMessage = response.responseText;
      var textMessageArray = textMessage.split("++");
      facebookApi.sendTextMessage(response.userId, textMessageArray[0], () => {
        facebookApi.senderAction(response.userId, 'typing_on');
        setTimeout(() => {
          facebookApi.senderAction(response.userId, 'typing_off');
          facebookApi.sendQuickReplyMessage(response.userId, textMessageArray[1], response.quickReplyButtons.template, () =>{
            return;
          });
        }, 2000);
      });
      break;

    case 'THREE_TEXT_WITH_QUICK_REPLY':
      var textMessage = response.responseText;
      var textMessageArray = textMessage.split("++");
      console.log("splitting "+textMessage);


      facebookApi.sendTextMessage(response.userId, textMessageArray[0], () => {
        facebookApi.senderAction(response.userId, 'typing_on');
        setTimeout(() => {
          facebookApi.senderAction(response.userId, 'typing_off');
          facebookApi.sendTextMessage(response.userId, textMessageArray[1], () => {
            facebookApi.senderAction(response.userId, 'typing_on');
            setTimeout(() => {
              facebookApi.senderAction(response.userId, 'typing_off');
              facebookApi.sendQuickReplyMessage(response.userId, textMessageArray[2], response.quickReplyButtons.template, () =>{
                return;
              });
            }, 3000);
          });
        }, 3000);
      });
      break;

      case 'MULTI_TEXT_IMAGE_WITH_QUICK_REPLY':
      var textMessage = response.responseText;
      var textMessageArray = textMessage.split("++");
      console.log("splitting "+textMessage);

      
      facebookApi.sendTextMessage(response.userId, textMessageArray[0], () => {
        facebookApi.senderAction(response.userId, 'typing_on');
        setTimeout(() => {
          facebookApi.senderAction(response.userId, 'typing_off');
          facebookApi.sendImage(response.userId, textMessageArray[1], function () {
            facebookApi.senderAction(response.userId, 'typing_on');
            setTimeout(() => {
              facebookApi.senderAction(response.userId, 'typing_off');
              facebookApi.sendTextMessage(response.userId, textMessageArray[2], () => {
                facebookApi.senderAction(response.userId, 'typing_on');
                setTimeout(() => {
                  facebookApi.senderAction(response.userId, 'typing_off');
                    facebookApi.sendTextMessage(response.userId, textMessageArray[3], () => {
                      facebookApi.senderAction(response.userId, 'typing_on');
                      setTimeout(() => {
                        facebookApi.senderAction(response.userId, 'typing_off');
                    facebookApi.sendTextMessage(response.userId, textMessageArray[4], () => {
                      facebookApi.senderAction(response.userId, 'typing_on');
                         facebookApi.sendQuickReplyMessage(response.userId, textMessageArray[5], response.quickReplyButtons.template, () =>{
                          return;
                        });
                      setTimeout(() => {},3000)
                    }, 3000);
                      })
                      
                    });
                }, 3000)
                
              })
              
            }, 3000);
          });
        }, 3000);
      });
      break;

    case 'FALLBACK':
      facebookApi.sendTextMessage(response.userId, response.responseText, function(cb) {
        return;
      });
      break;
  }
}

export { respondToUser };
