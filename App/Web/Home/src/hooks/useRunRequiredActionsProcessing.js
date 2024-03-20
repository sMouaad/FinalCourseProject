import { useEffect } from "react";
import { postToolResponse } from "../services/api";

export const useRunRequiredActionsProcessing = (
  run,
  setRun,
  setActionMessages
) => {
  useEffect(() => {
    if (run?.status === "requires_action") {
      let response = [];
      let actionMessages = [];
      setActionMessages(actionMessages);
      postToolResponse(run.thread_id, run.run_id, response).then(setRun);
    }
  }, [run, setRun]);
};
