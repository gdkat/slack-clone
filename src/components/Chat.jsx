import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import { useEffect, useRef } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { selectRoomId } from "../features/appSlice";
import { db } from "../firebase";
import ChatInput from "./ChatInput";
import Message from "./Message";

export default function Chat() {
  const match = useRouteMatch({
    path: "/:roomId",
    exact: true,
  });
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessages, roomMessagesLoading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    !roomMessagesLoading && scrollToBottom();
  }, [roomId, roomMessagesLoading]);

  if (!roomDetails || !roomMessages) return <></>;

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatHeaderLeft>
          <h4>
            <strong>#{roomDetails?.data().name}</strong>
          </h4>
          <StarBorderOutlined />
        </ChatHeaderLeft>
        <ChatHeaderRight>
          <InfoOutlined /> <p>Details</p>
        </ChatHeaderRight>
      </ChatHeader>
      <ChatMessages>
        {roomMessages?.docs.map((doc) => {
          const { message, timestamp, userName, userImage } = doc.data();

          return (
            <Message
              message={message}
              timestamp={timestamp}
              userName={userName}
              userImage={userImage}
            />
          );
        })}
      </ChatMessages>
      <ChatBottom ref={chatRef} />
      <ChatInput
        channelName={roomDetails?.data().name}
        channelId={roomId}
        scrollToBottom={scrollToBottom}
      />
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  position: relative;
  padding-bottom: 100px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > .MuiSvgIcon-root {
    font-size: 18px;
    margin-left: 5px;
    margin-top: 3px;
  }
`;

const ChatHeaderRight = styled.div`
  display: flex;
  align-items: center;

  > p {
    font-size: 14px;
  }

  > .MuiSvgIcon-root {
    margin-right: 5px;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div``;
