import Request from "./index";

export const ListUser = (params) => Request({
  url: '/users',
  method: 'get',
  params,
});

export const AddUser = (data) => Request({
  url: '/users',
  method: 'post',
  data,
});

export const EditUser = (id, data) => Request({
  url: `/users/${id}`,
  method: 'put',
  data,
});

export const GetUser = (id) => Request({
  url: `/users/${id}`,
  method: 'get',
});

export const DelUser = (id) => Request({
  url: `/users/${id}`,
  method: 'delete',
});

