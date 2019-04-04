import React from "react";
import classNames from "classnames/bind";
import styles from "./PostHeader.scss";
import { Link } from "react-router-dom";

import {
  Container,
  Menu,
  Button,
  Header,
  Modal,
  Icon
} from "semantic-ui-react";
const cx = classNames.bind(styles);

const PostHeader = ({
  onRemove,
  onModalOpen,
  onModalClose,
  modalState,
  isPublisher,
  postId
}) => {
  return (
    <Menu fixed="top" className={cx("header")}>
      <Container className={cx("header-content")}>
        <Link to="/">
          <Header as="h3" className={cx("brand")}>
            SnapChat
          </Header>
        </Link>

        {isPublisher === true && (
          <div className={cx("right")}>
            <Modal
              size="tiny"
              trigger={
                <Button
                  basic
                  color="orange"
                  className={cx("btn-delete")}
                  onClick={onModalOpen}
                >
                  <h4>삭제</h4>
                </Button>
              }
              open={modalState}
              onClose={onModalClose}
              closeIcon
            >
              <Header
                icon="snapchat ghost"
                content="해당 게시글을 삭제하실껀가요?"
              />
              <Modal.Actions>
                <Button color="red" onClick={onModalClose}>
                  <Icon name="remove" /> 취소
                </Button>
                <Button color="green" onClick={onRemove}>
                  <Icon name="checkmark" /> 삭제
                </Button>
              </Modal.Actions>
            </Modal>
            <Link to={`/editor?id=${postId}`}>
              <Button basic color="blue">
                <h4>수정</h4>
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </Menu>
  );
};

export default PostHeader;
