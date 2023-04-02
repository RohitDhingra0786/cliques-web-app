import Loader from "component/common/Loader";
import MessageContainer from "component/message-container";
import useMessages from "hooks/use-messages";
import { useSelector } from "react-redux";

const Messages = () => {
  const { loading } = useMessages();
  const { inboxList } = useSelector((state) => state.message);

  if (loading && !inboxList?.length) return <Loader />;

  return (
    <div className="dashboard-main">
      <MessageContainer />
    </div>
  );
};

export default Messages;
