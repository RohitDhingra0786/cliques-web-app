import { client } from "services";
import { onValue, push, ref, update } from "firebase/database";
import { db } from "hoc/firebase";
import { setAllUserList } from "redux/message-reducer";
import store from "redux/store";

// export const messageList = () =>
//   client.get('/api/Dialogs/loadDialogs').then(res => res.data);

// export const messageDetail = id =>
//   client.get(`/api/Dialogs/loadDialog?sel=${id}`).then(res => res.data);

// export const sendMessage = message =>
//   client.post('/api/Messages/send', {message}).then(res => res.data);

// export const uploadMessageFile = file => {
//   let formData = new FormData();
//   formData.append('file', file);
//   return client
//     .post('/api/Storages/dialog-messages/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     .then(res => res.data);
// };

// export const getFollowersList = payload => {
//   let pageOptions = {
//     length: 10,
//     ...payload,
//     orderBy: 'createdAt',
//     order: 'DESC',
//   };

//   return client.get(
//     `api/WineUsers/search_people?params=${JSON.stringify(pageOptions)}`,
//   );
// };

export const SendUserMessage = (messageId, messageJson) => {
  // database()
  //   .ref("message" + "/" + messageId)
  //   .push()
  //   .
  push(ref(db, "message" + "/" + messageId), messageJson)
    .then(function () {
      console.log("SendUserMessage succeeded.");
    })
    .catch(function (error) {
      console.log("Update Inbox failed: " + error.message);
    });
};

export const UpdateUserInboxOther = (id, otherId, jsonUserData2) => {
  // database()
  //   .ref("users/" + id + "/myInbox/" + otherId)

  update(ref(db, "users/" + id + "/myInbox/" + otherId), jsonUserData2)
    .then(function () {
      console.log("Update inbox succeeded of other.");
    })
    .catch(function (error) {
      console.log("Update Inbox failed: " + error.message);
    });
};

export const UpdateUserInboxMe = (id, otherId, jsonUserData) => {
  let ids = update(ref(db, "users/" + id + "/myInbox/" + otherId), jsonUserData)
    .then(function () {
      console.log("Update inbox succeeded of me");
    })
    .catch(function (error) {
      console.log("Update Inbox failed: " + error.message);
    });
};

export const UpdateUserMessage = (id, messageId, jsonUserData) => {
  database()
    .ref("message/" + id + `/${messageId}`)
    .update(jsonUserData)
    .then(function () {
      console.log("Update count succeeded.");
    })
    .catch(function (error) {
      console.log("Update Inbox failed: " + error.message);
    });
};

export const UpdateUserMessageCount = (id, jsonUserData) => {
  database()
    .ref("users/" + id)
    .update(jsonUserData)
    .then(function () {
      console.log("Update count succeeded.");
    })
    .catch(function (error) {
      console.log("Update Inbox failed: " + error.message);
    });
};

export const getJsonSearch = (obj, key, val) => {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == "object") {
      objects = objects.concat(getJsonSearch(obj[i], key, val));
    } else if ((i == key && obj[i] == val) || (i == key && val == "")) {
      objects.push(obj);
    } else if (obj[i] == val && key == "") {
      if (objects.lastIndexOf(obj) == -1) {
        objects.push(obj);
      }
    }
  }
  return objects;
};

export const clearChatSingle = (user_id, other_user_id) => {
  const messageIdME = "u_" + user_id + "__u_" + other_user_id;
  database()
    .ref()
    .child("message" + "/" + messageIdME + "/")
    .remove();
  const jsonUserDataMe = {
    count: 0,
    lastMessageType: "",
    lastMsg: "",
    lastMsgTime: "",
    user_id: other_user_id,
  };
  const user_id_send = "u_" + user_id;
  const inbox_id_me = "u_" + other_user_id;

  UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);
};

export const blockUnblockUser = (user_id, other_user_id, status) => {
  const user_id_send = "u_" + user_id;
  const inbox_id_me = "u_" + other_user_id;

  database()
    .ref(`/users/u_${other_user_id}`)
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        UpdateUserInboxMe(user_id_send, inbox_id_me, {
          block_status: status,
        });
      }
    });
};

export const deleteChatConfirm = (user_id, other_user_id, type, detail) => {
  var messageIdME = "u_" + user_id + "__u_" + other_user_id;
  if (type != "group") {
    database().ref().child(`message/${messageIdME}`).remove();
  }

  var jsonUserDataMe = {
    count: 0,
    lastMessageType: "",
    lastMsg: "",
    lastMsgTime: "",
    user_id: other_user_id,
  };
  var user_id_send = "u_" + user_id;
  var other_user_id_send = "u_" + other_user_id;
  // if (type != 'group') {
  //   UpdateUserInboxMe(user_id_send, other_user_id_send, jsonUserDataMe);
  // }
  database()
    .ref(
      `users/u_${user_id}/myInbox/${
        type != "group" ? other_user_id_send : detail?.group_id
      }`
    )
    .remove();
};

export const uploadChatImage = (payload) =>
  client.post("/chat_file_upload.php", payload).then((res) => res.data);

var userChatIdGloabl = "";
export const msg_update_read_status = (
  user_id,
  other_user_id,
  FirebaseUserJson
) => {
  var userChatId = "u_" + other_user_id + "__u_" + user_id;
  userChatIdGloabl = userChatId;

  // var queryOff_values_inbox = database().ref("message/").child(userChatId);
  // queryOff_values_inbox.off("value");

  setTimeout(function () {
    // var leadsRef = database().ref("message/" + userChatId);

    onValue(ref(db, "message/" + userChatId), function (data) {
      var jsonAllMessageData = data.toJSON();
      if (jsonAllMessageData != null) {
        Object.keys(jsonAllMessageData).forEach(function (key, index) {
          var valuedata = jsonAllMessageData[key];
          var key_value = key;

          var msg_read_status = valuedata.read_status;
          var senderId = valuedata.senderId;

          if (senderId == other_user_id) {
            if (msg_read_status == 2 || msg_read_status == 1) {
              // console.log('msg_read_status :: ', msg_read_status);
              // console.log('senderId :: ', senderId);
              var user_data_me = FirebaseUserJson.findIndex(
                (x) => x.user_id == user_id
              );

              if (user_data_me != -1) {
                var userDataMe = FirebaseUserJson[user_data_me];
                const onlineStatus = userDataMe.onlineStatus;
                const chat_room_id = userDataMe.chat_room_id;

                // if (chat_room_id != 'no') {
                //   if (chat_room_id == other_user_id) {
                console.log("condition true");
                markDubleClickRead(userChatId, key_value);
                //   }
                // }
              }
            }
          }
        });
      }
    });
  }, 1000);
};

function markDubleClickRead(userChatId, msgID) {
  console.log("userChatId : ", userChatId);
  console.log("msgID : ", msgID);
  if (msgID != null || msgID != "undefined" || msgID != "") {
    var jsonUserData = {
      read_status: 3,
    };
    // database()
    //   .ref("message/" + userChatId + "/" + msgID)
    //   .
    update(ref(db, "message/" + userChatId + "/" + msgID), jsonUserData)
      .then(function () {
        if (userChatIdGloabl != "") {
          var queryOffNew = firebase
            .database()
            .ref("message/")
            .child(userChatIdGloabl);
          queryOffNew.off("value");
        }
      })
      .catch(function (error) {});
  }
}

export const chatRoomIdUpdate = (user_id, other_user_id) => {
  var id = "u_" + user_id;
  var jsonUserDataMe = {
    chat_room_id: other_user_id,
  };
  CreateUser(id, jsonUserDataMe);
};

export const CreateUser = (id, jsonUserData, isForCreate) => {
  // database().ref("users/" + id);

  console.log({ id });
  update(ref(db, "users/" + id), jsonUserData)
    .then(function (data) {
      console.log("CreateUser success. :: ", data);

      // var onlineStatusRef = database().ref('users/' + id + '/onlineStatus/');
      // onlineStatusRef.onDisconnect().set('false');

      if (isForCreate) {
        firebaseUserCreateUpdatePlayerId();
      }
    })
    .catch(function (error) {
      console.log("CreateUser error: " + error.message);
    });
};

export const firebaseUserCreateUpdatePlayerId = (user_id) => {
  const playerId = store.getState()?.auth?.user?.playerId || "";
  console.log("firebaseUserCreateUpdatePlayerId");
  var user_id_me = user_id;
  var player_id_me = playerId;

  var queryAllUser = database().ref("users");
  queryAllUser.once("value", function (data) {
    console.log("user all data", data.toJSON());
    var allUserArr = data.toJSON();
    console.log("allUserArr", allUserArr.length);

    Object.keys(jsonAllMessageData).forEach(function (key, index) {
      var keyValue = jsonAllMessageData[key];
      var other_user_id = keyValue.user_id;
      var player_id_other = keyValue.player_id;

      console.log("other_user_id", other_user_id);
      console.log("player_id_other", player_id_other);
      if (user_id_me != other_user_id) {
        if (player_id_me == player_id_other) {
          console.log("player id update", other_user_id);
          var id = "u_" + other_user_id;
          var jsonUserDataMe = {
            player_id: "no",
          };
          CreateUser(id, jsonUserDataMe);
        }
      }
    });
  });
};

export const getAllUsersList = async () => (dispatch) => {
  onValue(
    ref(db, "/users"),
    (snapshot) => {
      const data = snapshot.val();
      let myList = [];
      Object.keys(data).forEach(function (key, index) {
        let value = data[key];
        value.tempId = key;
        myList.push(value);
      });
      // return myList;
      console.log("myList :: ", myList);
      dispatch(setAllUserList(myList));
      // getListOfInbox(myList);
    },
    { onlyOnce: true }
  );
};

export const checkprevgroup = (user1, user2, user3, user4, allGroupsList) => {
  // console.log('...current firebasegroupjson..', allGroupsList);

  var isthree = false;

  if (user4 == undefined || user4 == null) {
    isthree = true;
  }

  for (var i = 0; i < allGroupsList.length; i++) {
    var cgroupmembers = [];
    cgroupmembers = allGroupsList[i].members;
    if (cgroupmembers != undefined && cgroupmembers != null) {
      var cgroups = Object.keys(cgroupmembers);

      // console.log('..cgroupmembers are...', cgroups);
      // console.log('users are..', user1, user2, user3, user4);

      if (isthree == true) {
        if (
          cgroups.includes("u_" + user1) &&
          cgroups.includes("u_" + user2) &&
          cgroups.includes("u_" + user3)
        ) {
          return true;
        }
      } else {
        if (
          cgroups.includes("u_" + user1) &&
          cgroups.includes("u_" + user2) &&
          cgroups.includes("u_" + user3) &&
          cgroups.includes("u_" + user4)
        ) {
          return true;
        }
      }
    } else {
      // console.log('...cgroup is null or undefined..');
    }
  }
  return false;
};

export const CreateGroup = (id, jsonUserData, jsonUserDataMe, user_id) => {
  console.log("CreateGroup", jsonUserData);
  // database()
  //   .ref("groups/" + id)

  //   .
  update(ref(db, "groups/" + id), jsonUserData)
    .then(function () {
      console.log("Update inbox succeeded for create group");

      //-------------------- code for add in my inbox this group---------------
      var jsonUserDataInboxMe = {};
      var user_id_me = "u_" + user_id;
      jsonUserDataInboxMe[id] = {
        group_id: id,
        count: 0,
        group_joining_time: database.ServerValue.TIMESTAMP,
        type: "group",
      };
      CreateUserInbox(user_id_me, jsonUserDataInboxMe);

      //-------------------- code for add in all user inbox this group---------------
      Object.keys(jsonUserDataMe).forEach((key) => {
        var value_ass = jsonUserDataMe[key];
        if (value_ass.user_id !== user_id) {
          var user_id_new = "u_" + value_ass.user_id;
          CreateUserInbox(user_id_new, jsonUserDataInboxMe);
        }
      });
    })
    .catch(function (error) {
      console.log("Update Inbox failed: " + error.message);
    });
};

export const CreateUserInbox = (id, jsonUserData) => {
  console.log("CreateUserInbox", jsonUserData);
  database()
    .ref()
    .child("users/" + id + "/myInbox/")
    .update(jsonUserData)
    .then(function () {
      console.log("Update inbox succeeded for create user inbox");
    })
    .catch(function (error) {
      console.log("Update Inbox failed for create: " + error.message);
    });
};

export const firebaseUserCreate = async (userDetails) => {
  console.log("userDetails : ", userDetails);
  var user_arr = userDetails;
  var user_id = user_arr?.user_id;
  var name = user_arr?.name;
  var notification_status = user_arr?.notification_status;
  var email = user_arr?.email;
  var player_id_me = store.getState()?.auth?.playerId;
  var image = user_arr?.image;
  var address = user_arr?.address;
  var age = user_arr?.age;
  var gender_name = user_arr?.gender;
  var id = "u_" + user_id;

  var jsonUserDataMe = {
    name: name,
    email: email,
    image: image,
    onlineStatus: "true",
    player_id: player_id_me,
    user_id: Number(user_id),
    notification_status: notification_status,
    chat_room_id: "no",
    gender_name: gender_name,
    age: age,
    address: address,
    delete_flag: user_arr?.delete_flag,
    createdAt: new Date(),
  };
  console.log("jsonUserDataMe :: ", jsonUserDataMe);

  const isUserExist = await database()
    .ref(`/users/u_${id}`)
    .once("value")
    .then((snapshot) => {
      console.log("User data: ", snapshot.val());
      return snapshot.exists();
    });

  if (isUserExist) {
    CreateUser(id, jsonUserDataMe);
  } else {
    database()
      .ref(`/users/u_${id}`)
      .set(jsonUserDataMe)
      .then(() => console.log("Data set."));
  }
};

export const firebaseUserDelete = async (userDetails) => {
  console.log("userDetails : ", userDetails);
  var user_arr = userDetails;
  var user_id = user_arr?.user_id;
  var name = user_arr?.name;
  var notification_status = user_arr?.notification_status;
  var email = user_arr?.email;
  var player_id_me = user_arr?.player_id || 123456;
  var image = user_arr?.image;
  var address = user_arr?.address;
  var age = user_arr?.age;
  var gender_name = user_arr?.gender;
  var id = "u_" + user_id;

  var jsonUserDataMe = {
    name: name,
    email: email,
    image: image,
    onlineStatus: "true",
    player_id: player_id_me,
    user_id: Number(user_id),
    notification_status: notification_status,
    chat_room_id: "no",
    gender_name: gender_name,
    age: age,
    address: address,
    delete_flag: 1,
  };
  console.log("jsonUserDataMe :: ", jsonUserDataMe);
  CreateUser(id, jsonUserDataMe);
};

export const SendUserMessageGroup = (messageId, messageJson) => {
  // database()
  //   .ref("message" + "/" + messageId)
  //   .push()

  //   .
  push(ref(db, "message" + "/" + messageId), messageJson)
    .then(function () {
      console.log("Update inbox succeeded foe send message");
    })
    .catch(function (error) {
      console.log("Update Inbox failed: " + error.message);
    });
};

export const snapshotToArray = (snapshot) => {
  var returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};

export const leftGroup = (group_id, user_id) => {
  // console.log('========= left group', group_id, user_id);

  var member_id_send = "u_" + user_id;
  var group_id_send = group_id;

  database()
    .ref("users/" + member_id_send + "/myInbox/" + group_id_send)
    .remove();

  database()
    .ref("groups/" + group_id_send + "/members/" + member_id_send)
    .remove();

  chatRoomIdUpdate(user_id, "no");
};

export const getLeftedUserList = (payload) =>
  client.post("/getLeaveUsers.php", payload).then((res) => res.data);

export const addMemberToGroup = async (group_id, list) => {
  list.map((i) => {
    var jsonUserData = {};

    var new_user_id = i?.user_id;

    console.log("new_user_id", i?.user_id);

    jsonUserData[group_id] = {
      group_id: group_id,
      count: 0,
      group_joining_time: database.ServerValue.TIMESTAMP,
      type: "group",
    };

    var jsonUserDataMe = {};

    jsonUserDataMe["u_" + new_user_id] = {
      group_id: group_id,
      user_id: new_user_id,
      active_status: "yes",
      delete_flag: "no",
    };
    console.log("jsonUserData", jsonUserData);
    console.log("jsonUserDataMe", jsonUserDataMe);

    CreateGroupMembers(group_id, jsonUserDataMe);
    CreateUserInbox("u_" + new_user_id, jsonUserData);
  });
};

function CreateGroupMembers(id, jsonUserData) {
  console.log("CreateGroup", jsonUserData);
  // database()
  //   .ref()
  //   .

  update(ref(db, "groups/" + id + "/members/"), jsonUserData)
    .then(function () {
      console.log("Update inbox succeeded for create group member");
    })
    .catch(function (error) {
      console.log("Update Inbox failed: " + error.message);
    });
}
