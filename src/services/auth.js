import { client } from "services";

export const login = (payload) =>
  client.post("/handler_login.php", payload).then((res) => res.data);

export const getotherUserInfo = (payload) =>
  client
    .get("/other_user_profile.php", { params: payload })
    .then((res) => res.data);

export const getUserMatches = (userId) =>
  client
    .get(`/get_all_matched_user.php?user_id=${userId}`)
    .then((res) => res.data);
