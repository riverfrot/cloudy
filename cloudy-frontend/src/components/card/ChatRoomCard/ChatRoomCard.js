import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styles from "./ChatRoomCard.scss";
import classNames from "classnames";
import moment from "moment";

const cx = classNames.bind(styles);

const ChatRoomCard = ({ title, publishedDate, id, randomImageNumber }) => (
  <Card>
    <Link to={`/chatroom/${id}`}>
      <Image src={require(`images/${randomImageNumber}.jpg`)} />
    </Link>
    <Card.Content>
      <Link to={`/chatroom/${id}`}>
        <h1 className={cx("chat_header")}>{title}</h1>
      </Link>
      <Card.Meta>
        <span className="date">{moment(publishedDate).format("ll")}</span>
      </Card.Meta>
      {/* <Link to="/chatroom">
        <h4 className={cx("chat_desc")} />
      </Link> */}
    </Card.Content>
    <Card.Content extra>
      {/* <a>
        <Icon name="users" />
        22명 참여 중
      </a> */}
    </Card.Content>
  </Card>
);

export default ChatRoomCard;
