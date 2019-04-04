import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./EditorComponentHeader.scss";
import { Link } from "react-router-dom";

import { Container, Menu, Button, Header } from "semantic-ui-react";
const cx = classNames.bind(styles);

class EditorComponentHeader extends Component {
  render() {
    const { onSubmit, id } = this.props;
    return (
      <Menu fixed="top" className={cx("header")}>
        <Container className={cx("header-content")}>
          <Link to="/">
            <Header as="h3" className={cx("brand")}>
              SnapChat
            </Header>
          </Link>

          <div className={cx("right")}>
            <div>
              <Button basic color="blue" onClick={onSubmit}>
                {!id ? <h4>작성완료</h4> : <h4>수정완료</h4>}
              </Button>
            </div>
          </div>
        </Container>
      </Menu>
    );
  }
}

export default EditorComponentHeader;
