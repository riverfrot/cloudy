const Post = require('../../model/post');
const Joi = require('joi');
const { ObjectId } = require('mongoose').Types;

exports.checkObjectId = (ctx, next) => {
    const { id } = ctx.params;

    // 검증 실패
    if(!ObjectId.isValid(id)){
        ctx.status = 400; // 400 Bad Request
        return null;
    }
    return next();
};

exports.write = async (ctx) => 
{
    // 객체가 지닌 값을 먼저 검증한다.
    const schema = Joi.object().keys({
        title: Joi.string().required(), //문자열 검증 없으면 기본 값을 달라고 요청
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required() //문자열 배열 검증
    });
    
    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;

    //  새 Post 인스턴스를 만듭니다.
    const post = new Post({
        title, body, tags
    });

    try {
        await post.save(); // 데이터베이스에 등록합니다.
        ctx.body = post; //저장된 결과를 반환합니다.
    }   catch(e) {
        // 데이터베이스의 오류가 발생할 경우 에러 처리하는 구문.,
        ctx.throw(e, 500);
    }
};

exports.list = async (ctx) => 
{
    // page가 주어지지 않았다면, 1로 간주
    // query는 문자열 형태로 받아 오므로 숫자로 변환 한다.
    const page  = parseInt(ctx.query.page || 1, 10); //일반 변수로 받아오기 때문에 {} 중괄호를 사용 안함.
    const { tag } = ctx.query;// tags같은 경우는 객체의 형태로 받아 오기 때문에 {}를 사용

    const query = tag ? {
        tags: tag // tags 배열에 가진 포스트 찾기
    } : {}; //삼항연산자 만약에 tag가 존재한다면 { tags: tag }라는 객체를 query에 넣어주고
            //아니라면 빈값만 query에 넣어준다.

    // 잘못된 페이지가 주어졌다면 오류
    if(page < 1){
        ctx.status = 400;
        return ;
    }

    try {
        const posts = await Post.find(query)
        .sort({_id: -1})
        .limit(10)
        .skip((page - 1) * 10)
        .lean()
        .exec();

        const postCount = await Post.count(query).exec();

        
        const limitBodyLength = post => ({
            ...post, // 이전에 있던 post라는것을 가져와서 사용.
            body: post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`    
        });
        ctx.body = posts.map(limitBodyLength);

        // 마지막 페이지 알려 주기
        // ctx.set은 response header를 설정
        ctx.set('Last-Page', Math.ceil(postCount / 10));

    } catch(e) {
        ctx.throw(e, 500);
    }
};

exports.read = async (ctx) => 
{
    const { id } = ctx.params;

    try {
        const post = await Post.findById(id).exec();
        // 포스트가 존재 하지 않는다면
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    }catch(e) {
        ctx.throw(e, 500);
    }
    
};

exports.remove = async (ctx) => 
{
    const { id } = ctx.params;
    try{
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    }catch(e){
        ctx.throw(e,500);
    }
};

exports.update = async (ctx) => 
{
    const { id } = ctx.params;
    try {
        const post = await Post.findByIdAndUpdate(id,ctx.request.body, {
            new: true
            // 이 값을 설정해야 업데이트된 객체를 반환합니다.
            // 설정하지 않으면 업데이트되기 전의 객체를 반환합니다.
        }).exec();
        // 포스트가 존재하지 않을 때

        if(!post) {
            ctx.status = 404;
            return ;
        }
        ctx.body = post;
    }catch(e){
        ctx.throw(e, 500);
    }
};

exports.checkLogin = (ctx, next) => {
    if(!ctx.session.logged){
        ctx.status = 401; // Unauthorized
        return null;
    }
    return next();
};

// let postId = 1;

// const posts = [
//     {
//         id: 1,
//         title: '제목',
//         body: '내용'
//     }
// ];

// /* 포스트 작성 
//     POST /api/posts
//     {title, body }
// */

// exports.write = (ctx) => {
//     //  REST API의 request body 는 ctx.requst.body에서 조회 할 수 있습니다.
//     const {
//         title,
//         body
//     } = ctx.request.body;
    
//     postId +=1;

//     const post = { id: postId, title, body };
    
//     posts.push(post);

//     ctx.body = post;
// }

// /* 포스트 목록 조회
//     GET /api/posts
// */

// exports.list = (ctx) => {
//     ctx.body = posts;
// }

// /* 특정 포스트 조회
//     GET /api/posts/:id
// */

// exports.read = (ctx) => {
//     const { id } = ctx.params;

//     // 주어진 id 값으로 포스트를 찾습니다.
//     // 파라미터로 받아 온 값은 문자열 형식이니 파라미터를 숫자로 변환하거나,
//     // 비교할 p.id 값을 문자열로 변경해야 합니다.

//     const post = posts.find(p=> p.id.toString() === id);

//     // 포스트가 없으면 오류를 반환합니다.

//     if(!post) {
//         ctx.status = 404;
//         ctx.body = {
//             message: '포스트가 존재하지 않습니다.'
//         };
//         return ;
//     }
// };

// /* 특정 포스트 제거
//     DELETE /api/posts/:id
// */

// exports.remove = (ctx) => {
//     const { id } = ctx.params;

//     // 해당 id를 가진 post가 몇 번째인 지를 확인합니다.
//     const index = posts.findIndex(p => p.id.toString() === id);

//     //포스트가 없으면 오류를 반환합니다.
//     if(index === -1)
//     {
//         ctx.status = 404;
//         ctx.body = {
//             message: '포스트가 존재 하지 않습니다.'
//         };
//         return;
//     }

//     //index번째 아이템을 제거합니다.
//     posts.splice(index, 1);
//     ctx.status = 204; // No Content
// };

// /* 포스트 수정(교체))
//     PUT /api/posts/:id
//     { title, body }
// */

// exports.replace = (ctx) => {
//     // PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용합니다.

//     const { id } = ctx.params;

//     // 해당 id를 가진 post가 몇 번째인 지를 확인합니다.
//     const index = posts.findIndex(p => p.id.toString() === id);

//     // 포스트가 없으면 오류를 반환합니다.
//     if(index === -1)
//     {
//         ctx.status =404;
//         ctx.body = {
//             message: '포스트가 존재 하지 않습니다.'

//         };

//     }
//     return ;

//     // 전체 객체를 덮어씌웁니다.
//     // 따라서 id를 제외한 기존 정보를 날리고, 객체를 새로 만듭니다.
//     posts[index] = {
//         id,
//         ...ctx.request.body
//     };
//     ctx.body = posts[index];
// };


// /* 포스트 수정(특정 필드 변경)
//     PATCH /api/posts/:id
//     {title, body}
// */

// exports.update = (ctx) => {
//     // PATCH 메서드는 주어진 필드만 교체합니다.

//     const { id } = ctx.params;

//     // 해당 id를 가진 post가 몇 번째인 지를 확인합니다.
//     const index = posts.findIndex(p => p.id.toString() === id);

//     //포스트가 없으면 오류를 반환 합니다.
//     if(index === -1)
//     {
//         ctx.status = 404;
//         ctx.body = {
//            message : '포스트가 존재하지 않습니다.'
//         };
//         return;
//     }

//     // 기존 값에 정보를 덮어씌웁니다.
//     posts[index] = {
//         ...posts[index],
//         ...ctx.request.body
//     };
//     ctx.body = posts[index];  
// };


