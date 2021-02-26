import { useRef } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ChatInput(props) {
  const { channelName, channelId, scrollToBottom } = props;
  const [user, userLoading] = useAuthState(auth);
  const inputRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId || !inputRef.current.value || inputRef.current.value === "")
      return;

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userName: user.displayName,
      userImage: user.photoURL,
    });

    inputRef.current.value = "";
    scrollToBottom();
  };

  return (
    <ChatInputContainer onSubmit={(e) => sendMessage(e)}>
      <input ref={inputRef} placeholder={`Message #${channelName}`} />
      {/* <Button onClick={sendMessage}>Send</Button> */}
    </ChatInputContainer>
  );
}

const ChatInputContainer = styled.form`
  position: relative;
  display: flex;
  justify-content: center;

  > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    max-width: 100%;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 20px;
    outline: none;
  }
`;
