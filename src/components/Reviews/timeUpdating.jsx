import React, { useState, useEffect } from "react";
import moment from "moment";

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{ backgroundColor: "#f5f5f5" }}
      className="border fw-bold  text-center px-2 py-3 rounded-2"
    >
      {currentTime.format("MMMM Do YYYY, h:mm:ss a")}
    </div>
  );
};

export default LiveClock;
