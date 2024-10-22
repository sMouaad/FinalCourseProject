import { useState } from "react";
import Header from "./components/Header";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";
import ChatStatusIndicator from "./components/ChatStatusIndicator";
import Loading from "./components/Loading";
import { useThread } from "./hooks/useThread";
import { useRunPolling } from "./hooks/useRunPolling";
import { useRunRequiredActionsProcessing } from "./hooks/useRunRequiredActionsProcessing";
import { useRunStatus } from "./hooks/useRunStatus";
import { postMessage } from "./services/api";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

function App() {
  const { patientId } = useParams();
  const [run, setRun] = useState(undefined);
  const { threadId, messages, setActionMessages, clearThread } = useThread(
    run,
    setRun
  );
  useRunPolling(threadId, run, setRun);
  useRunRequiredActionsProcessing(run, setRun, setActionMessages);
  const { status, processing } = useRunStatus(run);

  let messageList = messages
    .toReversed()
    .filter((message) => message.hidden !== true)
    .map((message) => {
      return (
        <ChatMessage
          message={message.content}
          role={message.role}
          key={message.id}
        />
      );
    });

  return (
    <>
      <Sidebar patientId={patientId} />
      <div className="sm:ml-24 mt-10 lg:px-32 h-[80vh] sm:h-screen sm:mt-0 flex flex-col">
        <Header onNewChat={clearThread} />
        <div className="flex flex-col-reverse grow overflow-y-scroll">
          {status !== undefined && <ChatStatusIndicator status={status} />}
          {processing && <Loading />}
          {messageList}
        </div>
        <div className="my-4">
          <ChatInput
            onSend={(message) => {
              postMessage(threadId, message).then(setRun);
            }}
            disabled={processing}
          />
        </div>
      </div>
    </>
  );
}

export default App;
