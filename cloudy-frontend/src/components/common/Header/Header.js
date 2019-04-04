import React from "react";
import {
  Header,
  Dropdown,
  Container,
  Button,
  Icon,
  Segment,
  Modal,
  Input
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import styles from "./Header.scss";
import classNames from "classnames";
// import storage from 'lib/storage';

const cx = classNames.bind(styles);

const HeaderComponent = ({
  match,
  nickname,
  handleUserLogout,
  onChangeInput,
  onSubmit,
  onModalClose,
  onModalOpen,
  onKeyPress,
  modalState
}) => {
  const handleChange = e => {
    const { value, name } = e.target;
    onChangeInput({ value, name });
  };

  return (
    <Segment inverted style={{ marginBottom: "1em" }}>
      <Container as="h2" textAlign="right">
        {nickname === null ? (
          <Link to="/login">
            <h2 className={cx("login_text")}>로그인 / 회원가입</h2>
          </Link>
        ) : (
          <div>
            {match.path === "/chatroomlist" ? (
              <Modal
                trigger={
                  <Button basic inverted color="blue" onClick={onModalOpen}>
                    <h3 className={cx("login_text")}>방생성</h3>
                  </Button>
                }
                open={modalState}
                onClose={onModalClose}
                closeIcon
              >
                <Header
                  icon="snapchat ghost"
                  content="방 제목을 입력 해주세요."
                />
                <Modal.Content>
                  <Input
                    autoFocus
                    fluid
                    name="title"
                    placeholder="방 제목 입력"
                    icon="hand point right"
                    iconPosition="left"
                    onChange={handleChange}
                    onKeyPress={onKeyPress}
                  />
                </Modal.Content>
                <Modal.Actions>
                  <Button color="red" onClick={onModalClose}>
                    <Icon name="remove" /> 취소
                  </Button>
                  <Button color="green" onClick={onSubmit}>
                    <Icon name="checkmark" /> 방 개설하기
                  </Button>
                </Modal.Actions>
              </Modal>
            ) : (
              <Button basic inverted color="blue">
                <Link to="/editor">
                  <h3 className={cx("login_text")}>글쓰기</h3>
                </Link>
              </Button>
            )}

            <Dropdown className={cx("dropbox")} text={`${nickname}님`}>
              <Dropdown.Menu>
                {/* <Link to="/login">
                  <Dropdown.Item text="회원정보" />
                </Link>
                <Dropdown.Divider /> */}
                <Dropdown.Item text="로그아웃" onClick={handleUserLogout} />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </Container>

      <Header as="h1" icon textAlign="center">
        <Icon name="cloud" size="massive" />
        <br />
        <Link to={`/`}>
          <Button inverted color="olive">
            익명 게시판
          </Button>
        </Link>
        <Link to={`/chatroomlist`}>
          <Button inverted color="violet">
            스냅쳇
          </Button>
        </Link>
        <Link to={`/about`}>
          <Button inverted color="orange">
            소개
          </Button>
        </Link>
      </Header>
    </Segment>
  );
};
export default HeaderComponent;
