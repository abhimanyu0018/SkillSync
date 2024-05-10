export function LeaveScreen({ setIsMeetingLeft }) {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-gray-100   to-blue-100 h-screen flex flex-col flex-1 items-center justify-center">
      <h1 className="text-black text-5xl">You left the meeting!</h1>
      <div className="mt-12">
        <button
          className="`w-full bg-purple-350 text-white px-16 py-3 rounded-lg text-sm"
          onClick={() => {
            setIsMeetingLeft(false);
          }}
        >
          Rejoin the Meeting
        </button>
      </div>
    </div>
  );
}
