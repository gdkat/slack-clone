import {
  Add,
  Apps,
  BookmarkBorder,
  Create,
  Drafts,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
} from "@material-ui/icons";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const options = [
  {
    Icon: InsertComment,
    title: "Threads",
  },
  {
    Icon: Inbox,
    title: "Mentions & Reacts",
  },
  {
    Icon: Drafts,
    title: "Saved Items",
  },
  {
    Icon: BookmarkBorder,
    title: "Channel Browser",
  },
  {
    Icon: PeopleAlt,
    title: "People & Groups",
  },
  {
    Icon: Apps,
    title: "Apps",
  },
  {
    Icon: FileCopy,
    title: "File browser",
  },
  {
    Icon: ExpandLess,
    title: "Show less",
  },
];

export default function Sidebar() {
  const [channels, channelsLoading, channelsError] = useCollection(
    db.collection("rooms")
  );
  const [user] = useAuthState(auth);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Channel Name</h2>
          <h3>
            <FiberManualRecord />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <Create />
      </SidebarHeader>
      {options.map((option) => (
        <SidebarOption Icon={option.Icon} title={option.title} />
      ))}
      <hr />
      <SidebarOption Icon={ExpandMore} title={"Channels"} />
      <hr />
      <SidebarOption Icon={Add} title={"Add Channel"} addChannelOption />

      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin: 10px 0;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;

    > .MuiSvgIcon-root {
      font-size: 14px;
      margin-top: 1px;
      margin-right: 2px;
      color: green;
    }
  }
`;
