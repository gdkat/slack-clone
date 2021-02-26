import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { enterRoom } from "../features/appSlice";
import { db } from "../firebase";

export default function SidebarOption(props) {
  const { Icon, title, addChannelOption, id } = props;
  const dispatch = useDispatch();
  const { push } = useHistory();

  const SidebarOptionIcon =
    Icon &&
    styled(Icon)`
      padding: 10px;
    `;

  const addChannel = (e) => {
    const channelName = prompt("Please Enter the Channel Name");

    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };

  const selectChannel = (e) => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
      push("/" + id);
    }
  };

  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon ? (
        <>
          <SidebarOptionIcon /> <h3>{title}</h3>
        </>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
}

const SidebarOptionContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;

    > span {
      padding: 15px;
    }
  }
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
