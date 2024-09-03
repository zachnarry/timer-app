import { useEffect, useState } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editSeconds, setEditSeconds] = useState(0);
  const [editMinutes, setEditMinutes] = useState(0);
  const [editHours, setEditHours] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && (seconds > 0 || minutes > 0 || hours > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(interval);
              setIsActive(false);
            } else {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, hours]);

  function handleToggleTimer() {
    setIsActive((isActive) => !isActive);
    setIsEditing(false);
  }

  function resetTimer() {
    if (!isEditing) {
      setHours(editHours);
      setMinutes(editMinutes);
      setSeconds(editSeconds);
      setIsActive((isActive) => !isActive);
    }
    setIsActive(false);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === "hours") {
      setEditHours(parseInt(value));
    } else if (name === "minutes") {
      setEditMinutes(parseInt(value));
    } else if (name === "seconds") {
      setEditSeconds(value);
    }
  }

  function handleEdit() {
    if (isEditing) {
      setHours(editHours);
      setMinutes(editMinutes);
      setSeconds(editSeconds);
    }
    console.log("hello");
    console.log("test");
    setIsEditing((isEditing) => !isEditing);
  }

  return (
    <div className="relative min-h-screen flex justify-center items-center text-black">
      <div className="absolute z-10 inset-0 bg-gradient-to-r from-red-100 to-yellow-300"></div>
      <div className="z-20 flex flex-col gap-5">
        <h1 className="text-6xl font-bold text-center">Timer App</h1>
        {isEditing ? (
          <div className="flex flex-col">
            <div className="text-center text-5xl text-orange-700 font-semibold mb-7">
              {hours.toString().padStart(2, "0")} :{" "}
              {minutes.toString().padStart(2, "0")} :{" "}
              {seconds.toString().padStart(2, "0")}
            </div>
            <div className="mb-3 flex justify-between items-center">
              <label className="text-lg font-semibold">Hours</label>
              <input
                type="number"
                name="hours"
                value={editHours}
                onChange={handleInputChange}
                min="0"
                className="border rounded-3xl px-2 py-1 "
              />
            </div>
            <div className="mb-3 flex justify-between items-center">
              <label className="text-lg font-semibold">Minutes</label>
              <input
                type="number"
                name="minutes"
                value={editMinutes}
                onChange={handleInputChange}
                min="0"
                max="59"
                // className="border rounded-3xl px-2 py-1 flex-grow"
                className="border rounded-3xl px-2 py-1"
              />
            </div>
            <div className="mb-3 flex justify-between items-center">
              <label className="text-lg font-semibold">Seconds</label>
              <input
                type="number"
                name="seconds"
                value={editSeconds}
                onChange={handleInputChange}
                min="0"
                max="59"
                className="border rounded-3xl px-2 py-1"
              />
            </div>
            <button
              onClick={handleEdit}
              className="flex justify-center items-center self-center px-4 py-2 border rounded-3xl mt-3 bg-green-300 hover:bg-green-400 border-green-300 hover:border-green-400 whitespace-nowrap font-semibold text-lg"
            >
              Submit Timer
            </button>
          </div>
        ) : (
          <>
            <div className="text-5xl text-orange-700 font-semibold text-center my-5">
              <div style={{ width: "15ch", margin: "0 auto" }}>
                {hours.toString().padStart(2, "0")} :{" "}
                {minutes.toString().padStart(2, "0")} :{" "}
                {seconds.toString().padStart(2, "0")}
              </div>
            </div>
            <div className="text-black  flex justify-between items-center">
              {isActive ? (
                <button
                  className="hover:text-white rounded-3xl border px-4 py-2 bg-green-300 hover:bg-red-400 hover:border-red-400 border-green-300"
                  onClick={handleToggleTimer}
                >
                  Pause
                </button>
              ) : (
                <button
                  className="hover:text-white rounded-3xl border px-4 py-2 bg-green-300 border-green-300 hover:bg-green-400 hover:border-green-400"
                  onClick={handleToggleTimer}
                >
                  Start
                </button>
              )}
              <button
                className="hover:text-white border rounded-3xl px-4 py-2 bg-green-300 border-green-300 hover:bg-red-400 hover:border-red-400"
                onClick={resetTimer}
              >
                Reset
              </button>
              <button
                className="hover:text-white border bg-green-300 hover:bg-green-400 px-4 py-2 rounded-3xl border-green-300 hover:border-green-400"
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
