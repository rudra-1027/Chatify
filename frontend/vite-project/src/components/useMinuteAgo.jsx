import { useEffect, useState } from "react";

// STEP 2// STEP 1
function getTimeAgo(date) {
  if (!date) return "";

  const diff = Math.floor((Date.now() - new Date(date)) / 60000);

  if (diff < 1) return "Just now";
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}


export function useMinuteAgo(date) {
  const [time, setTime] = useState(() => getTimeAgo(date));

  useEffect(() => {
    if (!date) return;

    const interval = setInterval(() => {
      setTime(getTimeAgo(date));
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, [date]);

  return time;
}
