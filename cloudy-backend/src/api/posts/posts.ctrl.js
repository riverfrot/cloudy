const Post = require("../../model/Post");
const Joi = require("joi");
const { ObjectId } = require("mongoose").Types;

exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;

  // 검증 실패
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // 400 Bad Request
    return null;
  }
  return next();
};

exports.write = async ctx => {
  // 객체가 지닌 값을 먼저 검증한다.
  const schema = Joi.object().keys({
    title: Joi.string().required(), //문자열 검증 없으면 기본 값을 달라고 요청
    body: Joi.string().required(),
    publisher: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required() //문자열 배열 검증
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags, publisher } = ctx.request.body;

  const randomImageNumber = Math.floor(Math.random() * 32) + 1;

  //  새 Post 인스턴스를 만듭니다.
  const post = new Post({
    title,
    body,
    tags,
    publisher,
    randomImageNumber
  });

  try {
    await post.save(); // 데이터베이스에 등록합니다.
    ctx.body = post; //저장된 결과를 반환합니다.
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
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(16)
      .skip((page - 1) * 16)
      .lean()
      .exec();

    const postCount = await Post.count(query).exec();

    const limitBodyLength = post => ({
      ...post, // 이전에 있던 post라는것을 가져와서 사용.
      body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
    });
    ctx.body = posts.map(limitBodyLength);

    // 마지막 페이지 알려 주기
    // ctx.set은 response header를 설정
    ctx.set("Last-Page", Math.ceil(postCount / 16));
    ctx.set("next", next);
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.read = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    // 포스트가 존재 하지 않는다면
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.update = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
      // 이 값을 설정해야 업데이트된 객체를 반환합니다.
      // 설정하지 않으면 업데이트되기 전의 객체를 반환합니다.
    }).exec();
    // 포스트가 존재하지 않을 때

    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.checkLogin = (ctx, next) => {
  if (!ctx.session.logged) {
    ctx.status = 401; // Unauthorized
    return null;
  }
  return next();
};

exports.dummywrite = async ctx => {
  // const { title, body, tags, publisher } = ctx.request.body;

  const title_arr = new Array(
    "돈",
    "타임 패러독스",
    "Abby Green",
    "Character Savannah",
    "별 헤는 밤",
    "별 헤는 밤",
    "청춘예찬"
  );
  const body_arr = new Array(
    "<h5><strong>“부자가 되고 싶었다”</strong></h5><p>오직 부자가 되고 싶은 꿈을 품고 여의도 증권가에 입성한 신입 주식 브로커 조일현(류준열). <br/> 빽도 줄도 없는, 수수료 O원의 그는 곧 해고 직전의 처지로 몰린다.<br/> 위기의 순간, 베일에 싸인 신화적인 작전 설계자 번호표(유지태)를 만나게 되고, <br/> 막대한 이익을 챙길 수 있는 거래 참여를 제안 받는다. <br/> 위험한 제안을 받아들인 후 순식간에 큰 돈을 벌게 되는 일현. <br/> 승승장구하는 일현 앞에 번호표의 뒤를 쫓던 금융감독",
    "<h4><strong>줄거리</strong></h4><h5><strong>폭파범, 요원, 의문의 남자, 그리고 존 &amp; 제인</strong><br/><strong>“우리는 이 일을 위해 태어났다”</strong></h5><p>뉴욕을 초토화시킨 폭파 사건으로 대규모 사상자가 발생한다. 용의자 피즐 폭파범을 잡기 위해 범죄 예방 본부는 시간여행을 할 수 있는 템포럴 요원을 투입한다. <br/> <br/> 단서1. 템포럴 요원은 피즐 폭파범을 막다가 얼굴을 다쳐 이식수술을 한다. <br/> 단서2. 템포럴 요원은 바텐더로 위장 취업",
    "<p>Although the cause of death was reported as cancer, Abby, a 28-year-old junior programmer, is convinced that her friend, Rhiannon Thom, was murdered.</p><p>She is a British Christian who defines herself as gay. She has a degree in computing.</p><p>Physically, Abby is not in great shape. She needs",
    "<p>Savannah Daniel is a 34-year-old personal trainer who enjoys spreading fake news on Facebook, palm reading and working on cars. She is friendly and reliable, but can also be very cowardly and a bit impatient.</p><p>She is a British Christian who defines herself as straight. She finished school an",
    "<p>어머니, 하나에 그리워 둘 속의 내일 내 나의 이름과, 있습니다. 하나에 이제 벌레는 덮어 가을로 쉬이 어머님, 위에 있습니다. 별 차 시와 봅니다. 쓸쓸함과 다 멀듯이, 별이 남은 버리었습니다. 그러나 위에 가을로 가슴속에 어머님, 사랑과 슬퍼하는 까닭입니다. 무덤 위에 옥 봅니다. 별 무덤 애기 나는 무성할 새겨지는 가득 밤이 있습니다. 하나에 당신은 별들을 까닭입니다. 나는 벌써 나는 거외다. 이네들은 다 속의 토끼, 당신은 많은 걱정도 새워 계십니다.<br/></p><p>나는 하나에 이름을 사람들의 보고, 다 듯합니다.",
    "<p>잠, 밤을 이네들은 가난한 내일 봅니다. 토끼, 지나고 내 하나 사람들의 거외다. 나의 그리워 별에도 남은 거외다. 잠, 오면 까닭이요, 무엇인지 어머니 이름자를 듯합니다. 사람들의 자랑처럼 다 하나에 까닭입니다. 이름과, 벌써 다하지 별 어머님, 지나고 있습니다. 릴케 쉬이 이름자를 나의 듯합니다. 내 사랑과 까닭이요, 오면 파란 하나 계십니다. 그리워 가득 이웃 잠, 별이 있습니다. 속의 가을로 까닭이요, 하나에 이름과, 이름자를 아직 봅니다. 경, 이네들은 하나에 당신은 파란 계십니다.<br/></p><p>다하지 내일 까",
    "<p>우는 멀듯이, 벌레는 버리었습니다. 가난한 덮어 그리워 아침이 봅니다. 겨울이 쉬이 이웃 파란 하나 어머님, 청춘이 사랑과 봅니다. 사람들의 이제 다하지 까닭입니다. 오면 가슴속에 하나에 위에 있습니다. 헤는 소학교 이름과, 나는 있습니다. 아침이 별들을 이름과, 까닭입니다. 것은 밤을 내 차 못 계십니다. 내 추억과 별빛이 이 계십니다. 아스라히 피어나듯이 하나에 별 된 버리었습니다. 경, 북간도에 오면 노루, 봅니다.<br/></p><p>피어나듯이 어머니 별 강아지, 별 가을 별이 둘 써 있습니다. 쉬이 이네들은 된 계절이"
  );

  const tags_arr = new Array(
    "가난",
    "강아지",
    "별",
    "햇살",
    "밤",
    "총성",
    "돈",
    "독립",
    "줄거리",
    "미지",
    "소개",
    "SF",
    "미래",
    "현실",
    "낙담",
    "희망",
    "초콜릿"
  );
  const title = title_arr[Math.floor(Math.random() * 7) + 1];
  const body = body_arr[Math.floor(Math.random() * 7) + 1];
  const tags = new Array(
    tags_arr[Math.floor(Math.random() * 16) + 1],
    tags_arr[Math.floor(Math.random() * 16) + 1],
    tags_arr[Math.floor(Math.random() * 16) + 1]
  );
  const publisher = "riverfrot";
  const randomImageNumber = Math.floor(Math.random() * 32) + 1;

  //  새 Post 인스턴스를 만듭니다.
  const post = new Post({
    title,
    body,
    tags,
    publisher,
    randomImageNumber
  });

  try {
    await post.save(); // 데이터베이스에 등록합니다.
    ctx.body = post; //저장된 결과를 반환합니다.
  } catch (e) {
    // 데이터베이스의 오류가 발생할 경우 에러 처리하는 구문.,
    ctx.throw(e, 500);
  }
};
