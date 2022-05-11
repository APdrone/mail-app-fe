import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeComposed } from "../store/UserSlice";

const ComposeMsg = () => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user.userEmail);

  const handleCompose = () => {
    // dispatch(ChangeViewMail());
    dispatch(ChangeComposed());
  };

  const [reciever, SetReciever] = useState("");
  const [cc, SetCc] = useState("");
  const [bcc, SetBcc] = useState("");
  const [subject, SetSubject] = useState("");
  const [body, SetBody] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleComposeMail = async (e) => {
    e.preventDefault();
    try {
      const mailDetails = {
        toUser: reciever,
        ccUser: cc,
        bccUser: bcc,
        fromUser: loggedInUser,
        subject: subject,
        body,
        tag: "sent",
      };
      if (!reciever) {
        setError(true);
        setMsg("sender name cannot be blank");
      } else {
        // const res = await fetch("http://localhost:4000/api/v1/mail", {
        const res = await fetch(
          "https://mail-be-app.herokuapp.com/api/v1/mail",
          {
            method: "POST",
            body: JSON.stringify(mailDetails),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );

        if (!res.ok) throw new Error(`${res.status}`);

        const data = await res.json();
        console.log(data.mail);
        dispatch(ChangeComposed());
        setError(false);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col shadow-lg border w-1/3 rounded-xl absolute right-10 ">
      <div className="flex justify-between items-center font-semibold  bg-slate-800 text-white p-2">
        <h1>New Message</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={handleCompose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <form onSubmit={handleComposeMail}>
        <div className="flex flex-col divide-y border-b-2 mb-2">
          <input
            type="text"
            name="to"
            id="to"
            placeholder="To"
            className="p-2 focus-within:outline-none"
            value={reciever}
            onChange={(e) => SetReciever(e.target.value)}
          />
          <input
            type="text"
            name="cc"
            id="cc"
            placeholder="Cc"
            className="p-2 focus-within:outline-none"
            value={cc}
            onChange={(e) => SetCc(e.target.value)}
          />
          <input
            type="text"
            name="bcc"
            id="bcc"
            placeholder="Bcc"
            className="p-2 focus-within:outline-none"
            value={bcc}
            onChange={(e) => SetBcc(e.target.value)}
          />
          <input
            type="text"
            name="Subject"
            id="Subject"
            placeholder="Subject"
            className="p-2 focus-within:outline-none"
            value={subject}
            onChange={(e) => SetSubject(e.target.value)}
          />
          <textarea
            name="msgbody"
            id="msgbody"
            cols="30"
            rows="10"
            className="p-2 focus-within:outline-none"
            placeholder="mail body..."
            value={body}
            onChange={(e) => SetBody(e.target.value)}
          ></textarea>
        </div>
        <div className="h-5 w-full mt-1">
          {error && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-600 font-semibold text-sm">{msg}</span>
            </div>
          )}
        </div>
        <button
          className="text-white bg-blue-500  w-full px-5 py-2 mr-2 rounded-md font-medium mb-2"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ComposeMsg;
