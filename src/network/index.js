import http from "./http";
export const getLogin = (form) =>
  http({
    url: "/admin/login",
    method: "post",
    data: form,
  });
export const getAdminInfo = () => http({ url: "/admin/info", method: "get",});
export const getUserList = ({offset,limit}) => http({url:`/v1/users/list?offset=${offset}&limit=${limit}`, method: 'get', })
