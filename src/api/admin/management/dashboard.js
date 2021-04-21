import Request from "./index";

export const GetTotalTraffic = () => Request({
  url: '/traffic',
  method: 'get',
});

export const GetUpTraffic = () => Request({
  url: '/traffic/up',
  method: 'get',
});
export const GetDownTraffic = () => Request({
  url: '/traffic/down',
  method: 'get',
});
