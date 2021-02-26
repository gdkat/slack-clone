import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./components/Login";
import Spinner from "react-spinkit";

function App() {
  const [user, userLoading] = useAuthState(auth);

  if (userLoading) {
    return (
      <AppLoading>
        <AppLoadingContent>
          <img
            src="http://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt=""
          />

          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContent>
      </AppLoading>
    );
  }

  if (!user) {
    return (
      <Router>
        <Login />
      </Router>
    );
  }

  return (
    <div className="App">
      <Router>
        <Header />
        <AppBody>
          <Sidebar />
          <Switch>
            <Chat />
          </Switch>
        </AppBody>
      </Router>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
