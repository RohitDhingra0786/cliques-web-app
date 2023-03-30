import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messageList: {
      loading: false,
      data: [],
    },
    followers: {
      data: {
        users: [],
        total: 0,
      },
      loading: false,
      paginationLoading: false,
      start: 0,
    },
    messageCount: 0,
    inboxDetails: {},
    inboxList: [],
    conversationList: [],
    allUserList: [],
    allGroupsList: [],
    messageLimit: 20,
    updateChat: true,
  },
  reducers: {
    updateReecentChat: (state, { payload }) => {
      state.updateChat = !state.updateChat;
    },
    setAllUserList: (state, { payload }) => {
      state.allUserList = payload;
    },
    setAllGroupsList: (state, { payload }) => {
      state.allGroupsList = payload;
    },
    setInboxDetails: (state, { payload }) => {
      state.inboxDetails = payload;
    },
    setInboxList: (state, { payload }) => {
      state.inboxList = payload || [];
    },
    setMessageLimit: (state, { payload }) => {
      state.messageLimit = payload;
    },
    resetMessages: (state, action) => {
      state.inboxDetails = {};
      state.inboxList = [];
      state.conversationList = [];
    },
    setCurrentConversationList: (state, { payload }) => {
      let list = Object.values(payload);
      const messageIds = Object.keys(payload);

      list = list.map((e, i) => {
        return {
          ...e,
          message_id: messageIds[i],
        };
      });

      state.conversationList = list
        .sort(function (x, y) {
          return x.timestamp - y.timestamp;
        })
        .reverse();
    },
    // Set UnView Message Count
    setUnviewMessageCount: (state, { payload }) => {
      let messageList = [...state.messageList.data],
        messageIdx = messageList.findIndex(({ id }) => id == payload.id);
      if (messageIdx > -1) {
        messageList[messageIdx].unViewedMessagesCount = 0;
        messageList[messageIdx].viewed = true;
      }
      state.messageList.data = messageList;
      state.messageCount = state.messageCount - payload.unViewedMessagesCount;
    },

    // Append Message in Message List
    appendMessagesToList: (state, { payload }) => {
      let messageList = [...state.messageList.data],
        messageIdx = messageList.findIndex(({ id }) => id == payload.id);
      if (messageIdx > -1) {
        messageList[messageIdx].lastMessage = payload.message;
        messageList[messageIdx].messages = messageList[
          messageIdx
        ].messages.concat(payload.message);
      }

      state.messageList.data = messageList;
    },

    // Update The message on New Message
    updateMessageList: (state, { payload }) => {
      if (!Array.isArray(payload) && !Array.isArray(state.messageList.data))
        return;

      let messageArr = [...state.messageList.data];
      let newMessageArr = [...payload];

      newMessageArr.forEach((element) => {
        const itemIndex = messageArr.findIndex((o) => o.id === element.id);
        if (itemIndex > -1) {
          messageArr[itemIndex] = element;
        } else {
          messageArr = messageArr.push(element);
        }
      });

      state.messageList.data = messageArr;
      state.messageCount = calculateMessageCount(messageArr);
    },

    // Update Followers Page
    updateFollowersPage: (state, { payload }) => {
      state.followers.start = payload;
    },
  },
});

export const {
  updateMessageList,
  updateFollowersPage,
  appendMessagesToList,
  setUnviewMessageCount,
  setInboxDetails,
  setInboxList,
  setCurrentConversationList,
  setAllUserList,
  setAllGroupsList,
  resetMessages,
  setMessageLimit,
  updateReecentChat,
} = messageSlice.actions;

export default messageSlice.reducer;

const calculateMessageCount = (data) => {
  let tempArr = [...data];
  let count = tempArr.reduce((acc, e) => acc + e?.unViewedMessagesCount, 0);

  return count;
};
