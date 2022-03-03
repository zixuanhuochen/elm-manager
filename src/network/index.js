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
export const addShopInfo = data => http({url:'/shopping/addshop',method:'post',data})
export const getRestaurantsList = (data) => http({url:'/shopping/restaurants', method:'get',params:data})
export const getRestaurantCount = () => http({url:'/shopping/restaurants/count',method:'get'})
export const updateShop = data => http({url:'/shopping/updateshop',method:'post',data})
export const removeShop = id => http({url:'/shopping/restaurant/' + id, method:'delete'})
export const dayRegisterUser = data =>http({url:`/statis/user/${data}/count`, method:'get'})
export const registerUser = () => http({url:'/v1/users/count',method:'get'})
export const dayOrderCount = data =>http({url:`/statis/order/${data}/count`,method:'get'})
export const dayAdminCount = data => http({url:`/statis/admin/${data}/count`,method:'get'})
export const addCategoryInfo = data => http({url:'/shopping/addcategory',method:'post',data})
export const addFood = data => http({url:'/shopping/addfood',method:'post',data})
export const getUserScatter = () => http({url:'/v1/user/city/count',method:'get'})