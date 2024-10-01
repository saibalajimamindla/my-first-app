'use client'
import React, { useState, useEffect, useRef } from "react";

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const buttonCss = "w-full p-2 bg-green-500 text-white border-none mt-2 rounded cursor-pointer text-lg";

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isRunning]);
  

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="bg-white flex justify-center items-center h-screen m-0 font-sans">
      <div className="bg-black h-3/5 w-1/4 rounded-2xl flex flex-col items-center justify-center">
        <h1 className="text-white">Timmer</h1>
        <div className="bg-white text-black p-5 m-5 w-1/2 rounded-2xl flex items-center justify-center">{formatTime(time)}</div>
        <div className="overflow-auto m-2">
          <button className={buttonCss} onClick={handleStart}>
            Start
          </button>
          <button className={buttonCss} onClick={handleStop}>
            Stop
          </button>
          <button className={buttonCss} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;