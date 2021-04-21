import Request from "./index";

export const UserTraffic = () => Request({
  url: '/user-traffic',
  method: 'get',
});