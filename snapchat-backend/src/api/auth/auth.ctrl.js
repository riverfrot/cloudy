const Joi = require("joi");
const Account = require("../../model/Account");

// 로컬 회원가입
exports.localRegister = async ctx => {
  // 데이터 검증
  const schema = Joi.object().keys({
    id: Joi.string()
      .alphanum()
      .min(4)
      .max(15)
      .required(),
    password: Joi.string()
      .required()
      .min(6),
    nickName: Joi.string()
      .required()
      .min(2)
  });
  const result = Joi.validate(ctx.request.body, schema, function(err, value) {
    if (err) {
      console.log(err.message);
      return catched(err.message);
    }
  });

  // 스키마 검증 실패
  // if (result.error) {
  //   ctx.status = 400;
  //   return;
  // }

  // 아이디 / 이메일 중복 체크
  let existing = null;
  let overlapPoint = null;
  try {
    existing = await Account.findByEmailOrUsername(ctx.request.body);
  } catch (e) {
    ctx.throw(500, e);
  }
  if (existing) {
    // 중복되는 아이디/이메일이 있을 경우
    ctx.status = 409; // Conflict

    // 어떤 값이 중복되었는지 확인 합니다.
    ctx.request.body.nickName === existing.nickName
      ? (overlapPoint = "nickname")
      : (overlapPoint = "id");

    ctx.body = {
      // key: existing.id === ctx.request.body.id
      overlapPoint: overlapPoint
    };

    return;
  }

  //   계정 생성

  let account = null;
  try {
    account = await Account.localRegister(ctx.request.body);
  } catch (e) {
    ctx.throw(500, e);
  }

  let token = null;
  try {
    token = await account.generateToken();
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.cookies.set("access_token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  ctx.body = account; // 프로필 정보로 응답합니다.
};

// 로컬 로그인
exports.localLogin = async ctx => {
  // 데이터 검증
  const schema = Joi.object().keys({
    id: Joi.string()
      .alphanum()
      .min(4)
      .max(15)
      .required(),
    password: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400; // Bad Request
    return;
  }

  const { id, password } = ctx.request.body;

  let account = null;
  try {
    // 이메일로 계정 찾기
    account = await Account.findById(id);
  } catch (e) {
    ctx.throw(500, e);
  }

  if (!account || !account.validatePassword(password)) {
    // 유저가 존재하지 않거나 || 비밀번호가 일치하지 않으면
    ctx.status = 403; // Forbidden

    ctx.body = {
      // key: existing.id === ctx.request.body.id
      overlapPoint: "login"
    };
    return;
  }

  let token = null;
  try {
    token = await account.generateToken();
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.cookies.set("access_token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  });
  ctx.body = account.nickName;
};

// 이메일 / 아이디 존재유무 확인
exports.exists = async ctx => {
  const { key, value } = ctx.params;
  let account = null;

  try {
    // key 에 따라 findByEmail 혹은 findByUsername 을 실행합니다.
    account = await (key === "email"
      ? Account.findById(value)
      : Account.findByUsername(value));
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = {
    exists: account !== null
  };
};

// 로그아웃
exports.logout = async ctx => {
  ctx.cookies.set("access_token", null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
};

// 만약에 쿠키에 access_token 이 있다면, 현재 로그인된 유저의 정보를 알려주는 API
exports.check = ctx => {
  const { user } = ctx.request;

  if (!user) {
    ctx.status = 403; // Forbidden
    return;
  }

  ctx.body = user.id;
};
