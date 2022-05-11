import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { useSelector } from "react-redux";
import ViewMail from "../components/ViewMail";
import ViewSentMail from "../components/ViewSentMail";
import SentMain from "../components/SentMain";

const Homepage = () => {
  const isInboxOpen = useSelector((state) => state.user.inbox);
  const isMailOpen = useSelector((state) => state.user.viewMail);
  const isSentOpen = useSelector((state) => state.user.sentMail);
  return (
    <div>
      <div className="border border-b-2 border-neutral-200">
        <Navbar />
      </div>
      <div className="flex gap-5">
        <Sidebar />
        {isInboxOpen ? (
          isMailOpen ? (
            <ViewMail />
          ) : (
            <Main />
          )
        ) : isSentOpen ? (
          <SentMain />
        ) : (
          <ViewSentMail />
        )}

        {/* {isMailOpen  ? <ViewMail /> : <Main />}
        {isSentOpen ? <ViewSentMail /> : <SentMain />} */}
      </div>
    </div>
  );
};

export default Homepage;
