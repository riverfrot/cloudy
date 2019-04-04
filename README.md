# cloudy

# 1.사이트주소

https://www.cloudy.ga

# 2.기획

익명의 사용자들이 모여 특정 주제에 대해 이야기를 채팅&게시글 작성을
통해 의견을 나눌수있도록 하기 위해 개발

# 3.구현한 기능

> 1. React, Semantic-UI-React 을 사용하여 게시판, 채팅방등 프론트 페이지에들을 개발.
>    (Semantic-UI-React 로 처리하기 힘든 디자인 영역은 SCSS 를 사용하여 처리)
> 2. Koa, Node.js 를 사용하여 백엔드 서버 구축 및 RESTful 하게
> 3. 게시글, 채팅메시지 추가 가능하게끔 개발
> 4. Google, Facebook API 를 활용한 API 로그인 기능 개발
> 5. Socket.io 를 이용한 1:多 채팅 개발
> 6. 모바일 브라우저에서 접속해도 원할한 기능이 동작 가능하게끔 개발
> 7. 게시글, 채팅방 목록을 불러오는 페이징 부분은 Infinite Scrolling 을 활용하여 개발.
> 8. Router를 활용하여 SPA형식으로 개발
> 9. redux를 활용하여 상태관리 간편화
> 10. Presentational and Container Components로 구분하여 컴포넌트 작성
> 11. http://www.cloudy.ga로 입력했을때 자동으로 https로 리다이렉팅 되게 개발

# 4.ToDoList

- [x] http -> https 리다이렉팅 기능 구현
- [ ] TypeScript 적용
- [ ] 클린코드를 위한 TDD 작성
- [ ] 게시글 태그로 검색
- [ ] 제목, 글 내용 검색
