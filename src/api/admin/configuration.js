import Request from "./index";

export const GetConfLevelRange = () => Request({
  url: '/configuration/level-range',
  method: 'get',
});
