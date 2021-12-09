import { useEffect } from "react";

export const useFocusPoll = (
  startPolling: (pollInverval: number) => void,
  stopPolling: () => void,
  pollInterval: number
) => {
  const startPollingSequence = () => {
    if (document.hasFocus()) return startPolling(pollInterval);
    else return stopPolling();
  };

  useEffect(() => {
    setInterval(startPollingSequence, 1000);
  }, []);
};
