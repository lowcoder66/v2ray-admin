import Request from "./index";

export const NewToken = (data) => Request({
  url: '/token',
  method: 'post',
  data,
});
export const GetPrincipal = () => Request({
  url: '/principal',
  method: 'get',
});

export const SendResetPasswordEmail = (data) => Request({
  url: '/password',
  params: { op: "send-reset-email"},
  method: 'post',
  data
});
export const ResetPassword = (data) => Request({
  url: '/password',
  params: { op: "reset"},
  method: 'post',
  data
});
