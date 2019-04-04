import React from "react";
import HeaderContainer from "containers/common/HeaderContainer";
import { Message, Container, Icon } from "semantic-ui-react";

const AboutPage = () => {
  return (
    <div>
      <HeaderContainer />

      <Container text>
        <Message info>
          <Message.Header>Cloudy</Message.Header>
          <p>Cloudy란 익명 게시판 & 채팅 사이트 입니다.</p>
          <p>
            원래 컨셉은 하루마다 모든 데이터들이 삭제되는것이 메인 컨셉 입니다.
          </p>
          <p>
            현재는 더미데이터 유지를 위해 삭제하는 기능을 중지한 상태 입니다.
          </p>
        </Message>

        <Message color="orange">
          <p>
            문의사항 또는 버그 발견시 하단의 메일로 남겨주시면 감사하겠습니다.
          </p>
          <p>
            <Icon name="mail" />
            <a href="mailto:riverfrot@gmail.com ">riverfrot@gmail.com</a>
          </p>
          <p />
          <p>gitHub 주소</p>
          <p>
            <Icon name="github" />
            <a href="https://github.com/riverfrot/snapchat-frontend">
              https://github.com/riverfrot/snapchat-frontend
            </a>
          </p>
        </Message>
      </Container>
    </div>
  );
};

export default AboutPage;
