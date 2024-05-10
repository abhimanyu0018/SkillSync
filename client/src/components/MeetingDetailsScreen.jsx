import { Constants } from "@videosdk.live/react-sdk";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export function MeetingDetailsScreen({
  onClickJoin,
  _handleOnCreateMeeting,
  videoTrack,
  setVideoTrack,
  onClickStartMeeting,
  setMeetingMode,
  meetingMode,
}) {
  const [studioCode, setStudioCode] = useState("");
  const [studioCodeError, setStudioCodeError] = useState(false);
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
  const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);
  const { role, name, token, courseId } = useContext(AuthContext);
  const [participantName, setParticipantName] = useState(name);
  const [liveCode, setliveCode] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const getInfo = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/user/live/live-code`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId: courseId }),
        }
      );
      const data = await response.json();

      console.log(response);
      setliveCode(data.liveCode);
      console.log(liveCode);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const sendInfo = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/user/live/go-live`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseId: courseId, roomCode: studioCode }),
        }
      );
      const data = await response.json();
      console.log(response);
      console.log(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const sendNotification = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/user/notification/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseId: courseId }),
        }
      );
      const data = await response.json();
      console.log("sendNotification",response);
      console.log(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (role === "instructor") {
      sendInfo();
      sendNotification();
    }
  });
  useEffect(() => {
    if (role === "student") {
      getInfo();
    }
  });
  return (
    <div
      className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
    >
      {(iscreateMeetingClicked || isJoinMeetingClicked) && (
        <>
          <input
            readOnly
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Enter your name"
            className="px-4 py-3 mt-5 bg-gray-650 rounded-xl text-white w-full text-center"
          />
          <button
            disabled={participantName.length < 3}
            className={`w-full ${
              participantName.length < 3 ? "bg-gray-650" : "bg-purple-350"
            }  text-white px-2 py-3 rounded-xl mt-5`}
            onClick={(e) => {
              if (iscreateMeetingClicked) {
                if (videoTrack) {
                  videoTrack.stop();
                  setVideoTrack(null);
                }
                onClickStartMeeting();
              } else {
                if (liveCode.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                  onClickJoin(liveCode);
                } else setStudioCodeError(true);
              }
            }}
          >
            {iscreateMeetingClicked
              ? "Start a meeting"
              : isJoinMeetingClicked &&
                meetingMode === Constants.modes.CONFERENCE
              ? "Join Studio"
              : "Join meeting"}
          </button>
        </>
      )}

      {!iscreateMeetingClicked && !isJoinMeetingClicked && (
        <div className="w-full md:mt-0 mt-4 flex flex-col">
          <div className="flex items-center justify-center flex-col w-full">
            {role === "instructor" && (
              <button
                className="w-full bg-purple-350 text-white px-2 py-3 rounded-xl"
                onClick={async (e) => {
                  const studioCode = await _handleOnCreateMeeting();
                  setStudioCode(studioCode);
                  setIscreateMeetingClicked(true);
                  setMeetingMode(Constants.modes.CONFERENCE);
                }}
              >
                Create a meeting
              </button>
            )}

            {role === "student" && (
              <button
                className="w-full bg-gray-650 text-white px-2 py-3 rounded-xl mt-5"
                onClick={(e) => {
                  setIsJoinMeetingClicked(true);
                  setMeetingMode(Constants.modes.VIEWER);
                }}
              >
                Join Class
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
