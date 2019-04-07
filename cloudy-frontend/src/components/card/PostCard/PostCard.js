import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styles from "./PostCard.scss";
import classNames from "classnames";
import moment from "moment";

const cx = classNames.bind(styles);

const PostCard = ({ id, title, body, publishedDate, randomImageNumber }) => (
  <Card>
    <Link to={`/post/${id}`}>
      <Image src={require(`images/${randomImageNumber}.jpg`)} />
    </Link>
    <Card.Content>
      <Link to={`/post/${id}`}>
        <h1 className={cx("post_header")}>{title}</h1>
      </Link>
      <Card.Meta>
        <span className="date">{moment(publishedDate).format("ll")}</span>
      </Card.Meta>
      <Link to={`/post/${id}`}>
        <h4 className={cx("post_desc")}>{body}</h4>
      </Link>
    </Card.Content>
    <Card.Content extra>
      {/* <a>
        <Icon name="comments" />
        22개의 댓글
      </a> */}
    </Card.Content>
  </Card>
);

export default PostCard;
