import Request from "./index";

export const ModifyUserInfo = (id, data) => Request({
  url: `/users/${id}`,
  method: 'post',
  data,
  params: {
    op: "modify-user-info"
  }
});

export const ModifyPassword = (id, data) => Request({
  url: `/users/${id}`,
  method: 'post',
  data,
  params: {
    op: "modify-password"
  }
});