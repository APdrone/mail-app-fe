import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeViewMail } from "../store/UserSlice";
import ComposeMsg from "./ComposeMsg";

const SentMain = () => {
  const [usermails, setUserMails] = useState([]);

  const dispatch = useDispatch();

  const handleCompose = (id) => {
    dispatch(
      ChangeViewMail({
        id,
        inbox: false,
        viewinbox: false,
        sent: false,
        viewSend: true,
      })
    );
  };

  const isComposedMail = useSelector((state) => state.user.isComposed);
  const loggedInUser = useSelector((state) => state.user.userEmail);

  const getMailTime = (sentTime) => {
    const date = new Date(sentTime);
    const hour = date.getUTCHours();
    const mins = date.getUTCMinutes();
    let time;
    if (hour === 0) {
      time = `12:${mins} am`;
    } else if (hour < 12) {
      time = `${hour}:${mins} am`;
    } else if (hour === 12) {
      time = `${hour}:${mins} pm`;
    } else if (hour < 24) {
      time = `${hour - 12}:${mins} pm`;
    } else if (hour === 24) {
      time = `${12}:${mins} pm`;
    }
    return time;
  };

  useEffect(() => {
    const getMails = async () => {
      const res = await fetch(
        `http://localhost:4000/api/v1/mail/sent?fromUsr=${loggedInUser}&tag=sent`
      );

      if (!res.ok) throw new Error(`${res.status}`);

      const data = await res.json();
      setUserMails(data.mails);
    };

    getMails();
  }, []);

  return (
    <div className="basis-11/12">
      {usermails.length === 0 && (
        <span className="text-lg flex items-center justify-center p-4">
          No Mails Sent
        </span>
      )}
      {usermails.map((mail) => {
        const { _id, toUser, body, createdAt } = mail;

        return (
          <div
            key={_id}
            className="flex justify-between p-4 cursor-pointer border-b-2"
            onClick={() => handleCompose(_id)}
          >
            <div className="flex items-center gap-3 basis-2/12">
              <input type="checkbox" name="" id="" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <h1>{`To: me, ${toUser} `}</h1>
            </div>

            <p className="basis-8/12">{body.slice(0, 100)}</p>
            <div className="basis-1/12">
              <span>{getMailTime(createdAt)}</span>
            </div>
          </div>
        );
      })}

      {isComposedMail && <ComposeMsg />}
    </div>
  );
};

export default SentMain;
