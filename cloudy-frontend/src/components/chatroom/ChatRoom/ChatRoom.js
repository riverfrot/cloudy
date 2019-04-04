import React, { Component } from "react";
import { Message, Grid, Segment } from "semantic-ui-react";
import storage from "lib/storage";
import { Helmet } from "react-helmet";

const nickname = storage.get("loggedNickname");
class ChatRoom extends Component {
  render() {
    const { chatList } = this.props;
    console.log(chatList.toJS());
    const chatMessageList = chatList.toJS();
    const children = [];
    chatMessageList.map((chatMessages, i) => {
      children.push(
        <ChildMessageComponent
          key={i}
          message={chatMessages.text}
          userID={chatMessages.userID}
        />
      );
    });

    return <ParentMessageComponent children={children} />;
  }
}

const ParentMessageComponent = props => (
  <div>
    <Helmet>
      <title>Cloudy - 익명 채팅방</title>
    </Helmet>

    <Segment style={{ marginTop: "1em", marginBottom: "5em" }}>
      {props.children}
    </Segment>
  </div>
);

const ChildMessageComponent = props => (
  <div>
    {props.userID === nickname ? (
      <Grid columns={2} relaxed="very">
        <Grid.Column>
          <Message icon>
            <Message.Content>
              <Message.Header>{props.userID}</Message.Header>
              {props.message}
            </Message.Content>
          </Message>
        </Grid.Column>
      </Grid>
    ) : (
      <Grid columns={2} relaxed="very">
        <Grid.Column />
        <Grid.Column textAlign="right">
          <Message icon>
            <Message.Content>
              <Message.Header>{props.userID}</Message.Header>
              {props.message}
            </Message.Content>
          </Message>
        </Grid.Column>
      </Grid>
    )}
  </div>
);

export default ChatRoom;
