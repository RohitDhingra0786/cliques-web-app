import MessageContainer from "component/message-container";
import useMessages from "hooks/use-messages";

const Messages = () => {
  const {} = useMessages();
  return (
    <div className="dashboard-main">
      <MessageContainer />
    </div>
  );
};

export default Messages;
