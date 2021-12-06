import React from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import GlobalStyles from "./component/Layout/GlobalStyles";
import CustomRouter from "./Route/CustomRouter";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUBCRIBE_KEY,
});

const App = () => {
  return (
    <>
      <PubNubProvider client={pubnub}>
        <GlobalStyles />
        <CustomRouter />
      </PubNubProvider>
    </>
  );
};

export default App;
