import React, { Component } from "react";
import ChatRoomCard from "components/card/ChatRoomCard";
import { Grid } from "semantic-ui-react";
import withSizes from "react-sizes";

class ChatRoomList extends Component {
  render() {
    const { chatrooms } = this.props;

    const chatList = chatrooms.map(chat => {
      const { _id, title, publishedDate, randomImageNumber } = chat.toJS();
      return (
        <Grid.Column key={_id}>
          <ChatRoomCard
            title={title}
            publishedDate={publishedDate}
            id={_id}
            randomImageNumber={randomImageNumber}
          />
        </Grid.Column>
      );
    });

    return (
      <Grid
        container
        columns={this.props.isMobile ? 2 : this.props.isMedium ? 3 : 4}
      >
        {chatList}
      </Grid>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
  isMedium: width < 720
});
export default withSizes(mapSizesToProps)(ChatRoomList);
