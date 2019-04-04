import React from "react";
import { Button, Input, Menu } from "semantic-ui-react";

const ChatRoomMessageInput = ({
  chatMessage,
  onChatSend,
  onChange,
  onKeyPress
}) => {
  return (
    <div>
      <Menu fixed="bottom" fluid widths={1}>
        <Menu.Item>
          <Input
            fluid
            type="text"
            placeholder="메시지를 입력해 주세요."
            action
            style={{ marginTop: "1em" }}
            name="chatMessage"
            value={chatMessage}
            onChange={onChange}
            onKeyPress={onKeyPress}
          >
            <input />
            <Button color="blue" onClick={onChatSend}>
              Send
            </Button>
          </Input>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default ChatRoomMessageInput;
