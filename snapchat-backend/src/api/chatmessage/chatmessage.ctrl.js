const ChatMessage = require("../../model/ChatMessage");
const Joi = require("joi");

//채팅 메시지 저장하는 부분은
//소켓쪽에서 데이터를 저장합니다.

exports.list = async ctx => {
  const roomID = ctx.query.roomID;

  try {
    const chatmessages = await ChatMessage.find({ roomID })
      // .sort({ _id: -1 })
      .lean()
      .exec();

    // const chatmessageCount = await ChatMessage.count(query).exec();

    const limitBodyLength = chatmessage => ({
      ...chatmessage // 이전에 있던 chatmessage라는것을 가져와서 사용.
    });
    ctx.body = chatmessages.map(limitBodyLength);

    // 마지막 페이지 알려 주기
    // ctx.set은 response header를 설정
    // ctx.set("Last-Page", Math.ceil(chatmessageCount / 16));
  } catch (e) {
    ctx.throw(e, 500);
  }
};
