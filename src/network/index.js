import http from "./http";
export const getLogin = (form) =>
  http({
    url: "/admin/login",
    method: "post",
    data: form,
  });
export const getAdminInfo = () => http({ url: "/admin/info", method: "get" });
export const getUserList = ({ offset, limit }) =>
  http({
    url: `/v1/users/list?offset=${offset}&limit=${limit}`,
    method: "get",
  });
export const getUserCount = () =>
  http({ url: "/v1/users/count", method: "get" });
export const getAdminCount = () => http({ url: "/admin/count", method: "get" });
export const getAdminList = ({ offset, limit }) => http({
  url:`/admin/all?offset=${offset}&limit=${limit}`,
  method:'get'
})
export const getFoodList = ({ offset, limit }) => http({url:`/shopping/v2/foods?offset=${offset}&limit=${limit}`, method:'get'})
export const getFoodCount = () => http({url:'/shopping/v2/foods/count', method:'get' })
export const getCategoryInfo = category_id => http({url:`/shopping/v2/menu/${category_id}`,method:'get' })
export const getRestaurantInfo = restaurant_id => http({url:`/shopping/restaurant/${restaurant_id}`,method:'get' })
