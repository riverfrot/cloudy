const ChatRoom = require("../../model/ChatRoom");
const Joi = require("joi");

exports.register = async ctx => {
  // 객체가 지닌 값을 먼저 검증한다.
  const schema = Joi.object().keys({
    roomID: Joi.string().required(), //문자열 검증 없으면 기본 값을 달라고 요청
    title: Joi.string().required() //문자열 검증 없으면 기본 값을 달라고 요청
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { roomID, title } = ctx.request.body;
  const randomImageNumber = Math.floor(Math.random() * 32) + 1;

  //  새 채팅방을 인스턴스를 만듭니다.
  const chatroom = new ChatRoom({
    roomID,
    title,
    randomImageNumber
  });

  try {
    await chatroom.save(); // 데이터베이스에 등록합니다.
    ctx.body = chatroom; //저장된 결과를 반환합니다.
  } catch (e) {
    // 데이터베이스의 오류가 발생할 경우 에러 처리하는 구문.,
    ctx.throw(e, 500);
  }
};

exports.list = async ctx => {
  // page가 주어지지 않았다면, 1로 간주
  // query는 문자열 형태로 받아 오므로 숫자로 변환 한다.
  const page = parseInt(ctx.query.page || 1, 10); //일반 변수로 받아오기 때문에 {} 중괄호를 사용 안함.

  const next = parseInt(ctx.query.next || 0, 10);
  const { tag } = ctx.query; // tags같은 경우는 객체의 형태로 받아 오기 때문에 {}를 사용

  const query = tag
    ? {
        tags: tag // tags 배열에 가진 포스트 찾기
      }
    : {}; //삼항연산자 만약에 tag가 존재한다면 { tags: tag }라는 객체를 query에 넣어주고
  //아니라면 빈값만 query에 넣어준다.

  // 잘못된 페이지가 주어졌다면 오류
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const chatrooms = await ChatRoom.find(query)
      .sort({ _id: -1 })
      .limit(16)
      .skip((page - 1) * 16)
      .lean()
      .exec();

    const chatroomCount = await ChatRoom.count(query).exec();

    const limitBodyLength = chatroom => ({
      ...chatroom // 이전에 있던 chatroom라는것을 가져와서 사용.
    });
    ctx.body = chatrooms.map(limitBodyLength);

    // 마지막 페이지 알려 주기
    // ctx.set은 response header를 설정
    ctx.set("Last-Page", Math.ceil(chatroomCount / 16));
    ctx.set("next", next);
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.dummyregister = async ctx => {
  // const { title, body, tags, publisher } = ctx.request.body;

  const title_arr = new Array(
    "랜덤 방 생성",
    "익명 채팅 방",
    "Abby Green Room",
    "Character Savannah Room",
    "별 헤는 밤",
    "별 헤는 밤",
    "청춘예찬"
  );

  const title = title_arr[Math.floor(Math.random() * 7) + 1];
  const randomImageNumber = Math.floor(Math.random() * 32) + 1;

  //  새 채팅방을 인스턴스를 만듭니다.
  const chatroom = new ChatRoom({
    title,
    randomImageNumber
  });

  try {
    await chatroom.save(); // 데이터베이스에 등록합니다.
    ctx.body = chatroom; //저장된 결과를 반환합니다.
  } catch (e) {
    // 데이터베이스의 오류가 발생할 경우 에러 처리하는 구문.,
    ctx.throw(e, 500);
  }
};
