import http from './http'
export const getLogin = form =>http({
  url:'/admin/login',
  method:'post',
  data:form
})