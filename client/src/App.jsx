import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"; // Imported once here

import ExplorePage from "./components/Explore/ExplorePage";
import OutletRouter from "./components/Home/OutletRouter";
import HomePage from "./components/Home/HomePage";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/SignUp/SignupPage";
import AboutPage from "./components/StaticPages/AboutPage";
import StudentDashboard from "./components/UserInfo/StudentDashboard";
import ProfilePage from "./components/UserInfo/ProfilePage";
import CourseContentPage from "./components/Courses/CourseContentPage";
import InstructorDashboard from "./components/UserInfo/InstructorDashboard";
import CourseCreateForm from "./components/UserInfo/CourseCreateForm";
import { AuthContext } from "./context/AuthContext";
import PreviewCourse from "./components/Courses/PreviewCourse";
import Invoices from "./components/UserInfo/Invoices";
import { Constants, MeetingProvider } from "@videosdk.live/react-sdk";
import { LeaveScreen } from "./components/screens/LeaveScreen";
import { JoiningScreen } from "./components/screens/JoiningScreen";
import { ILSContainer } from "./interactive-live-streaming/ILSContainer";
import { MeetingAppProvider } from "./MeetingAppContextDef";
import ContactPage from "./components/StaticPages/ContactPage";
import EditCourse from "./components/Courses/EditCourse";

const App = () => {
  const {isloggedIn , role , name } = useContext(AuthContext)
  const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [webcamOn, setWebcamOn] = useState(true);
  const [selectedMic, setSelectedMic] = useState({ id: null });
  const [selectedWebcam, setSelectedWebcam] = useState({ id: null });
  const [selectWebcamDeviceId, setSelectWebcamDeviceId] = useState(
    selectedWebcam.id
  );
  const [meetingMode, setMeetingMode] = useState(Constants.modes.CONFERENCE);
  const [selectMicDeviceId, setSelectMicDeviceId] = useState(selectedMic.id);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);

  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;

  useEffect(() => {
    if (isMobile) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isMobile]);

  return (
    <>
    <Routes>
    <Route path="/" element={<OutletRouter />}>
            {/* Default Route */}
            <Route index element={<HomePage />} />
            <Route path="/login" element={!isloggedIn ? <LoginPage /> : <HomePage/>} />
            <Route path="/signup" element={!isloggedIn ? <SignUpPage /> : <HomePage/>} />
            <Route path="/explore" element={isloggedIn ? role=== "student" ? <ExplorePage/> : <HomePage/> : <LoginPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/profile" element={isloggedIn ? <ProfilePage /> : <LoginPage/>} />
            <Route path="/course/:id" element={ isloggedIn ? role === "student" ? <CourseContentPage /> : <HomePage/> : <LoginPage/>} />
            <Route path="/dashboard" element={isloggedIn ? role ==="student" ? <StudentDashboard/> : <InstructorDashboard/> : <LoginPage/>} />
            <Route path="/createCourse" element={isloggedIn ? role === "instructor" ? <CourseCreateForm /> : <HomePage/>: <LoginPage/>} />
            <Route path="/editCourse/:id" element={isloggedIn ? role === "instructor" ? <EditCourse /> : <HomePage/>: <LoginPage/>} />
            <Route path="/previewCourse/:id" element={ isloggedIn ? role === "instructor" ? <PreviewCourse /> : <HomePage/> : <LoginPage/>} />
            <Route path="/invoice" element={isloggedIn ? role === "student" ? <Invoices /> : <HomePage/> : <LoginPage/>} />
          </Route>
          <Route path="/liveClass" element={ isloggedIn ? ( isMeetingStarted ? (
        <MeetingAppProvider
          selectedMic={selectedMic}
          selectedWebcam={selectedWebcam}
          initialMicOn={micOn}
          initialWebcamOn={webcamOn}
        >
          <MeetingProvider
            config={{
              meetingId,
              micEnabled: micOn,
              webcamEnabled: webcamOn,
              name: participantName ? participantName : name,
              mode: meetingMode,
              multiStream: false,
            }}
            token={token}
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
          >
            <ILSContainer
              onMeetingLeave={() => {
                setToken("");
                setMeetingId("");
                setParticipantName("");
                setWebcamOn(false);
                setMicOn(false);
                setMeetingStarted(false);
              }}
              setIsMeetingLeft={setIsMeetingLeft}
              selectedMic={selectedMic}
              selectedWebcam={selectedWebcam}
              selectWebcamDeviceId={selectWebcamDeviceId}
              setSelectWebcamDeviceId={setSelectWebcamDeviceId}
              selectMicDeviceId={selectMicDeviceId}
              setSelectMicDeviceId={setSelectMicDeviceId}
              micEnabled={micOn}
              webcamEnabled={webcamOn}
              meetingMode={meetingMode}
              setMeetingMode={setMeetingMode}
            />
          </MeetingProvider>
        </MeetingAppProvider>
      ) : isMeetingLeft ? (
        <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
      ) : (
        <JoiningScreen
          participantName={participantName}
          setParticipantName={setParticipantName}
          setMeetingId={setMeetingId}
          setToken={setToken}
          setMicOn={setMicOn}
          micEnabled={micOn}
          webcamEnabled={webcamOn}
          setSelectedMic={setSelectedMic}
          setSelectedWebcam={setSelectedWebcam}
          setWebcamOn={setWebcamOn}
          onClickStartMeeting={() => {
            setMeetingStarted(true);
          }}
          startMeeting={isMeetingStarted}
          setIsMeetingLeft={setIsMeetingLeft}
          meetingMode={meetingMode}
          setMeetingMode={setMeetingMode}
        />
      )) : (<LoginPage/>)}  />
    </Routes>
    </>
  );
};

export default App;
