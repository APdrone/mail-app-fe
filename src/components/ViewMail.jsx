import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeMailSent } from "../store/UserSlice";

const ViewMail = () => {
  const dispatch = useDispatch();

  const handleChangeView = () => {
    // dispatch(ChangeViewMail({}));
    dispatch(
      ChangeMailSent({
        inbox: true,
        viewinbox: false,
        sent: false,
        viewSend: false,
      })
    );
  };
  const selectedUserId = useSelector((state) => state.user.userId);
  const loggedInUser = useSelector((state) => state.user.userEmail);
  const [mail, setMail] = useState("");

  useEffect(() => {
    const getMails = async () => {
      const res = await fetch(
        `https://mail-be-app.herokuapp.com/api/v1/mail?user=${loggedInUser}&tag=sent`
      );

      if (!res.ok) throw new Error(`${res.status}`);

      const data = await res.json();
      // console.log(data.mails);
      const findMail = data.mails.find((mail) => mail._id === selectedUserId);

      console.log("found", findMail);

      setMail(findMail);
    };

    getMails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const {subject,fromUser,body}=mail;

  return (
    <>
      {mail && (
        <div className="basis-11/12">
          <div className="flex gap-4 my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={handleChangeView}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>

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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <div className="flex items-center gap-3 my-4">
            {/* <h1 className="text-2xl">Help! Please turn this alarm off </h1> */}
            <h1 className="text-2xl">{mail.subject} </h1>
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
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="flex gap-4 my-4">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="sender"
              className="w-12 h-12 rounded-3xl"
            />
            <div>
              {/* <h2>no-reply@ncb.flipkart.com</h2> */}
              <h2>{mail.fromUser}</h2>
              <h3>to me</h3>
            </div>
          </div>
          <div>
            {/* Dear Aman Patwal , <br />
        Your B24 WE Capstone - Gmail clone (Web app) task has been assigned in
        the zen portal! You have 22/04/2022 - Friday, 16:00 to 10/05/2022 -
        Tuesday, 16:00 to complete. Kindly raise Queries in Zen Portal and get
        your doubts resolved. Submit the Heroku/Netlify and GitHub repository
        URLs in the Zen Portal! Note: You can find the Capstone details in the
        Left Side Menu of your Zen Portal. We wish you All the Best Aman
        Patwal!!! <br />
        Thanks and Regards,
        <br /> Zen Team. */}
            {mail.body}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewMail;
