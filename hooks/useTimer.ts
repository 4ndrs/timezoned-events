import { useEffect, useState } from "react";

/**
 * Returns the seconds showing how much is left until/has
 * passed since timestamp (unix)
 *
 */
const useTimer = (timestamp: number) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(timeDifference(timestamp));

    const id = setInterval(() => setSeconds(timeDifference(timestamp)), 1000);

    return () => clearInterval(id);
  }, [timestamp]);

  return seconds;
};

const timeDifference = (timestamp: number) =>
  Math.trunc((timestamp - Date.now()) / 1000);

export default useTimer;
