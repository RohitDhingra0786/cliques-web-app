import MessageHeader from "./message-header";
import { useRef } from "react";
import ImageIcon from "assets/images/image.png";
import Image from "next/image";
import SendIcon from "assets/images/send.png";
import { Container, FileIcon, Form, MessageBox } from "./styles";
import Messages from "./messages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  limitToLast,
  query,
  ref,
  onValue,
  serverTimestamp,
} from "firebase/database";
import { db } from "hoc/firebase";
import {
  setCurrentConversationList,
  setMessageLimit,
} from "redux/message-reducer";
import {
  chatRoomIdUpdate,
  getJsonSearch,
  SendUserMessage,
  SendUserMessageGroup,
  snapshotToArray,
  UpdateUserInboxMe,
  UpdateUserInboxOther,
  uploadChatImage,
} from "services/message";
import { useState } from "react";

const MessageDetail = ({}) => {
  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth);
  const {
    messageLimit,
    conversationList,
    inboxList,
    allUserList,
    allGroupsList,
    selectedChat: data,
  } = useSelector((state) => state.message);

  //
  const [message, setMessage] = useState("");

  const chatDetails =
    inboxList?.filter((i) => i?.key == data?.details?.key)[0] || {};
  const { details } = data;

  // Ref
  const fileRef = useRef();

  useEffect(() => {
    const url =
      data?.details?.type == "group"
        ? `/message/${data?.details?.group_id}`
        : `/message/u_${user_id}__u_${data?.details?.user_id}`;

    const recentMessages = query(ref(db, url), limitToLast(messageLimit));

    onValue(recentMessages, (snapshot) => {
      dispatch(
        setCurrentConversationList(snapshot.exists() ? snapshot.val() : {})
      );
    });
  }, [data, messageLimit]);

  const onPressSend = async (messageType, contain) => {
    // setMessageLoading(true);
    setMessage("");
    const other_user_id = details?.user_id;
    var user_id_send = "u_" + user_id;
    var other_user_id_send = "u_" + other_user_id;
    var inbox_id_me = "u_" + other_user_id;
    var inbox_id_other = "u_" + user_id;
    var block_status_get = "no";
    var room_id = null;
    var message_notification = false;

    const user_data_other = inboxList.findIndex(
      (x) => x.user_id == other_user_id
    );

    if (user_data_other >= 0) {
      var jsonDataInbox = inboxList[user_data_other];
      var blockUser = jsonDataInbox.myInbox;
      if (blockUser != undefined) {
        var other_user_data = getJsonSearch(blockUser, "user_id", user_id);
        if (other_user_data.length > 0) {
          block_status_get = other_user_data[0].block_status;
          room_id = other_user_data[0].chat_room_id;
        }
      }
    }
    const isUserExists = allUserList.findIndex(
      (i) => i.user_id == other_user_id
    );
    room_id = allUserList[isUserExists]?.chat_room_id || "no";
    message_notification =
      allUserList[isUserExists]?.message_notification || false;
    if (isUserExists > -1) {
      onUserNotExists(
        other_user_id,
        user_id,
        user_id_send,
        inbox_id_me,
        block_status_get
      );
    } else {
      if (user_data_other >= 0) {
        var jsonDataInbox = inboxList[user_data_other];
        var blockUser = jsonDataInbox.myInbox;
        if (blockUser != undefined) {
          var other_user_data = getJsonSearch(blockUser, "user_id", user_id);
          if (other_user_data.length <= 0) {
            UpdateUserInboxOther(other_user_id_send, inbox_id_other, {
              count: 0,
              lastMessageType: "",
              lastMsg: "",
              type: "single",
              user_id: user_id,
              typing_status: "no",
              block_status: "no",
              match_status: "yes",
              lastMsgTime: serverTimestamp(),
            });
          }
        }
      }
    }
    var onlineStatus = details?.onlineStatus;
    var chat_room_id = "";
    var read_status = "";
    var user_data_me = inboxList.findIndex((x) => x.user_id == other_user_id);

    if (user_data_me != -1) {
      var userDataMe = inboxList[user_data_me];
      onlineStatus = userDataMe.onlineStatus;
      chat_room_id = userDataMe.chat_room_id;

      read_status = onlineStatus == "true" ? 2 : 1;
      if (chat_room_id != "no") {
        if (chat_room_id == user_id) {
          read_status = 3;
        }
      }
    }

    var messageIdME = "u_" + user_id + "__u_" + other_user_id;
    var messageIdOther = "u_" + other_user_id + "__u_" + user_id;
    var senderId = user_id;
    var timestamp = new Date().getTime();
    var messageJson = {
      message: contain,
      messageType: messageType,
      senderId: senderId,
      timestamp: timestamp,
      read_status: read_status,
    };

    if (block_status_get == "no" || block_status_get == undefined) {
      SendUserMessage(messageIdME, messageJson);
      SendUserMessage(messageIdOther, messageJson);
      if (room_id !== null && room_id == "no" && message_notification) {
        // console.log('Player id--------', [
        //   allUserList[isUserExists]?.player_id,
        // ]);
        // sendPushNotification({
        //   title: user?.name || "",
        //   message:
        //     messageType === "image"
        //       ? "Photo"
        //       : messageType === "gif"
        //       ? "GIF"
        //       : messageType === "audio"
        //       ? "sent you a voice note"
        //       : contain,
        //   player_id_arr: [allUserList[isUserExists]?.player_id],
        //   image:
        //     messageType === "image"
        //       ? getImageUrl(contain)
        //       : messageType === "gif"
        //       ? contain
        //       : getImageUrl(user?.image),
        //   isLargeIcon: true,
        //   additionalData: {
        //     type: "single",
        //     id: user_id,
        //     isMessage: true,
        //   },
        // });
      } else {
        console.log("room_id : ", room_id);
      }
    } else {
      SendUserMessage(messageIdME, messageJson);
    }

    var jsonUserDataMe = {
      count: 0,
      lastMessageType: messageType,
      lastMsg: contain,
      type: "single",
      typing_status: "no",
      lastMsgTime: serverTimestamp(),
    };

    UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);

    var chat_room_id = other_user_id;
    var count_new = 0;

    onValue(
      ref(db, "users/" + other_user_id_send + "/myInbox/" + inbox_id_other),
      function (data) {
        var count_old = data.val()?.count || 0;
        count_new = parseInt(count_old) + 1;

        if (block_status_get == "no" || block_status_get == undefined) {
          UpdateUserInboxOther(other_user_id_send, inbox_id_other, {
            count: read_status == 3 ? 0 : count_new,
            lastMessageType: messageType,
            lastMsg: contain,
            type: "single",
            typing_status: "no",
            lastMsgTime: serverTimestamp(),
          });
        }
      },
      { onlyOnce: true }
    );
    // setMessageLoading(false);
  };

  const rendetImageIcon = () => {
    return (
      <FileIcon>
        <input
          accept="image/*"
          style={{ display: "none" }}
          type={"file"}
          onChange={onPickImage}
          ref={fileRef}
        />

        <Image
          title="file-icon"
          alt="file-icon"
          onClick={() => fileRef?.current?.click()}
          src={ImageIcon}
          height={20}
          width={20}
          style={{ background: "transparent", cursor: "pointer" }}
        />
      </FileIcon>
    );
  };

  const onUserNotExists = () => {
    const other_user_id = details?.user_id;
    var user_id_send = "u_" + user_id;
    var other_user_id_send = "u_" + other_user_id;
    var inbox_id_me = "u_" + other_user_id;
    var inbox_id_other = "u_" + user_id;
    var block_status_get = "no";
    var jsonUserDataMe = {
      count: 0,
      lastMessageType: "",
      lastMsg: "",
      type: "single",
      user_id: other_user_id,
      typing_status: "no",
      block_status: "no",
      match_status: "yes",
      lastMsgTime: serverTimestamp(),
    };

    if (block_status_get == "no" || block_status_get == undefined) {
      UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);
      UpdateUserInboxOther(other_user_id_send, inbox_id_other, {
        // count: 0,
        lastMessageType: "",
        lastMsg: "",
        type: "single",
        user_id: user_id,
        typing_status: "no",
        block_status: "no",
        match_status: "yes",
        lastMsgTime: serverTimestamp(),
      });
    } else {
      UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);
    }
  };

  const onPickImage = (e) => {
    console.log("file", e.target.files[0]);
    const _image = e.target.files[0];
    uploadImageForChat(_image);
  };

  const uploadImageForChat = async (image) => {
    const request = new FormData();
    request.append("user_id", user_id);
    request.append("file_type", "image");
    request.append("file", image);
    const response = await uploadChatImage(request);
    // setloading(false);
    if (response.success == "true") {
      var fileUrl = response.file;
      details?.type === "group"
        ? onSendGroupMessage("image", fileUrl)
        : onPressSend("image", fileUrl);
    } else {
      // showError(response?.msg || strings.somethingWentWrong);
    }
  };

  const onSendGroupMessage = async (messageType, contain, isAdmin = 0) => {
    setMessage("");

    var messageIdME = details?.group_id;
    var group_id = details?.group_id;
    // var userName = user?.name || "NegeanDean";
    var userName = "NegeanDean";

    var senderId = user_id;
    var count_new = 0;
    var messageJson = {
      message: contain,
      messageType: messageType,
      lastMsgType: messageType,
      senderId: isAdmin ? 0 : senderId,
      name: userName,
      messageDelete: "no",
      timestamp: serverTimestamp(),
      lastMsgTime: serverTimestamp(),
    };
    SendUserMessageGroup(messageIdME, messageJson);
    var user_id_me = user_id;
    var chat_room_id = details?.group_id;
    chatRoomIdUpdate(user_id_me, chat_room_id);
    const isGroupAvailable = allGroupsList.filter(
      (i) => i.group_id == group_id
    );
    if (isGroupAvailable.length > 0) {
      var groupData = isGroupAvailable[0];
      var members = groupData.members;
      //   player_id_other_group_arr = [];
      let userArray = [];
      Object.keys(members).forEach(function (key) {
        var keyValue = members[key];
        var user_id_member = keyValue.user_id;
        var user_id_member_check = String(user_id_member);
        var user_id_me_check = String(user_id);
        var user_data_me = allUserList.findIndex(
          (x) => x.user_id == user_id_member
        );
        userArray = [...userArray, allUserList[user_data_me]];
        if (user_data_me != -1) {
          var chat_room_id = allUserList[user_data_me].chat_room_id;
          if (chat_room_id == "no" || chat_room_id != group_id) {
            // var query = database()
            //   .ref("users/")
            //   .child("u_" + user_id_member)
            //   .child("/myInbox/");

            var query = ref(db, "users/" + "u_" + user_id_member + "/myInbox/");

            onValue(
              query,
              function (data) {
                var array_data = snapshotToArray(data);
                var getCountData = getJsonSearch(
                  array_data,
                  "group_id",
                  group_id
                );
                if (getCountData.length > 0) {
                  var countData = getCountData[0];
                  if (countData.count != undefined) {
                    var count_old = countData.count;
                  } else {
                    var count_old = 0;
                  }

                  count_new = parseInt(count_old) + 1;

                  var messageJson = {
                    count: user_id_member == user_id ? 0 : count_new,
                    lastMsg: contain,
                    lastMsgType: messageType,
                    messageType: messageType,
                    lastMsgTime: serverTimestamp(),
                  };
                  console.log("messageJson true condition :: ", messageJson);
                  UpdateUserInboxMe(
                    "u_" + user_id_member,
                    group_id,
                    messageJson
                  );
                }
              },
              { onlyOnce: true }
            );
          } else {
            var messageJson = {
              lastMsg: contain,
              lastMsgType: messageType,
              messageType: messageType,
              lastMsgTime: serverTimestamp(),
            };
            console.log("messageJson : ", messageJson);
            UpdateUserInboxMe(
              "u_" + user_id_member,
              details?.group_id,
              messageJson
            );
          }
        }
      });
    }
  };

  console.log({ conversationList });

  return (
    <Container>
      <MessageHeader
        details={details}
        title={chatDetails?.name || data?.details?.name || ""}
      />

      <div className="wrapper">
        <Messages details={details} list={conversationList || []} />

        <div />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            details?.type === "group"
              ? onSendGroupMessage("text", message)
              : onPressSend("text", message);
          }}
        >
          <div className="input-div">
            <input
              value={message}
              placeholder="Your message..."
              type={"text"}
              onChange={(e) => setMessage(e.target.value)}
            />

            {rendetImageIcon()}
          </div>

          <button type="submit">
            <Image
              alt="send"
              title="send"
              src={SendIcon}
              height={16}
              width={16}
            />
          </button>
        </Form>
      </div>
    </Container>
  );
};

export default MessageDetail;
