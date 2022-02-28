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
export const getAdminList = ({ offset, limit }) =>
  http({
    url: `/admin/all?offset=${offset}&limit=${limit}`,
    method: "get",
  });
export const getFoodList = ({ offset, limit }) =>
  http({
    url: `/shopping/v2/foods?offset=${offset}&limit=${limit}`,
    method: "get",
  });
export const getFoodCount = () =>
  http({ url: "/shopping/v2/foods/count", method: "get" });
export const getCategoryInfo = (category_id) =>
  http({ url: `/shopping/v2/menu/${category_id}`, method: "get" });
export const getRestaurantInfo = (restaurant_id) =>
  http({ url: `/shopping/restaurant/${restaurant_id}`, method: "get" });
export const getShopCategory = (restaurant_id) =>
  http({ url: `/shopping/getcategory/${restaurant_id}`, method: "get" });
export const updateFood = (foodForm) =>
  http({ url: "/shopping/v2/updatefood", method: "post", data: foodForm });
export const getOrderList = (data) =>
  http({ url: "/bos/orders", method: "get", params: data });
export const getOrderCount = () =>
  http({ url: "/bos/orders/count", method: "get" });
export const getOrderAddress = (data) =>
  http({ url: "/v1/addresse/" + data, method: "get" });
export const getUserInfo = (data) =>
  http({ url: "/v1/user/" + data, method: "get" });
export const removeFood = (data) =>
  http({ url: "/shopping/v2/food/" + data, method: "delete" });
export const getFoodCategory = () => http({ url: '/shopping/v2/restaurant/category', method: 'get' })
